import { Injectable } from '@nestjs/common';
import { bdUserRolesRights } from 'src/lib/default/bd-user-roles-rights';
import { styleValue, styleType } from 'src/lib/default/style';
import { InsetUserSuper } from '../../lib/script/bd-start/InsetUserSuper';
import { insetRoles } from '../../lib/script/bd-start/insetRoles';
import { InsetRights } from '../../lib/script/bd-start/insetRights';
import { VariableServer } from '../variable/variable.server';
import { RouterServer } from '../router/router-server';
import { nameAllApi } from '../../lib/name/nameApi';
import { ConvertRouterToBd } from '../../lib/script/bd-start/convertRouterToBd';
import { InsetUserRoles } from '../../lib/script/bd-start/insetUserRoles';
import { uniqueArray } from '../../lib/script/uniqueScript';
import { insetStyle } from '../../lib/script/bd-start/insetStyle';
import { StyleServer } from '../style/style.server';
import { StyleTypeServer } from '../style/style-type/style-type.server';

@Injectable()
export class ScriptService {
  constructor(
    private variableServer: VariableServer,
    private routerServer: RouterServer,
    private styleServer: StyleServer,
    private styleTypeServer: StyleTypeServer,
  ) {}
  // первая загрузка при создания проекта
  async DataSetBd() {
    const variable = await this.variableServer.getValKey('isActive');
    if (variable && variable.value === 'true') {
      return 'Проект активен';
    }
    await this.variableServer.createKey('isActive', 'true');
    await this.variableServer.createKey('rolesAllId', '3');
    await this.variableServer.createKey('rightsAdminId', '1');
    const userRes = await InsetUserSuper(bdUserRolesRights.user);
    const rightsRes = await InsetRights(bdUserRolesRights.rights);
    const rolesRes = await insetRoles(bdUserRolesRights.roles);
    // const rolesRights = await InsetRolesRights(bdUserRolesRights.roles_rights);
    await InsetUserRoles(bdUserRolesRights.user_roles);
    const routerRes = await this.routerServer.savesRouter(
      ConvertRouterToBd(nameAllApi),
    );
    const style = insetStyle(styleType, styleValue);
    return {
      user: userRes,
      roles: `Созданно roles ${rolesRes}`,
      rights: `Созданно rights ${rightsRes}`,
      // rolesRights: rolesRights,
      router: routerRes,
      style: style,
    };
  }
  async DataSetApi() {
    const allRouter = ConvertRouterToBd(nameAllApi);
    const routerBd = await this.routerServer.getAllRouters();

    const routerRes = await this.routerServer.savesRouter(
      uniqueArray(allRouter, routerBd, 'key'),
    );
    return {
      routerRes,
    };
  }
  async DataSetStyle() {
    const styleValueBd = await this.styleServer.findStyleAll();
    const styleTypeBd = await this.styleTypeServer.findStyleTypeAll();
    const styleValueUnique = uniqueArray(styleValue, styleValueBd, 'name');
    const styleTypeUnique = uniqueArray(styleType, styleTypeBd, 'name');
    await insetStyle(styleTypeUnique, styleValueUnique);
    return {
      styleType: styleTypeUnique,
      styleValue: styleValueUnique,
    };
  }
}
