import { Injectable } from '@nestjs/common';
import { bdUserRolesRights } from 'src/lib/default/bd-user-roles-rights';

import { InsetUserSuper } from '../../lib/script/bd-start/InsetUserSuper';
import { insetRoles } from '../../lib/script/bd-start/insetRoles';
import { InsetRights } from '../../lib/script/bd-start/insetRights';
// import { InsetRolesRights } from '../../lib/script/bd-start/insetRolesRights';
import { VariableServer } from '../variable/variable.server';
import { RouterServer } from '../router/router-server';
import { nameAllApi } from '../../lib/name/nameApi';
import { ConvertRouterToBd } from '../../lib/script/bd-start/convertRouterToBd';
import { InsetUserRoles } from '../../lib/script/bd-start/insetUserRoles';

@Injectable()
export class ScriptService {
  constructor(
    private variableServer: VariableServer,
    private routerServer: RouterServer,
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
    return {
      user: userRes,
      roles: `Созданно roles ${rolesRes}`,
      rights: `Созданно rights ${rightsRes}`,
      // rolesRights: rolesRights,
      router: routerRes,
    };
  }
  async DataSetApi() {
    return ConvertRouterToBd(nameAllApi);
  }
}
