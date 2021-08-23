import { Injectable } from '@nestjs/common';
import { bdUserRolesRights } from 'src/lib/default/bd-user-roles-rights';

import { InsetUserSuper } from '../../lib/script/bd-start/InsetUserSuper';
import { insetRoles } from '../../lib/script/bd-start/insetRoles';
import { InsetRights } from '../../lib/script/bd-start/insetRights';
import { InsetRolesRights } from '../../lib/script/bd-start/insetRolesRights';
import { VariableServer } from '../variable/variable.server';
import { RouterServer } from '../router/router-server';
import { nameAllApi } from '../../lib/name/nameApi';
import { ConvertRouterToBd } from '../../lib/script/bd-start/convertRouterToBd';

@Injectable()
export class ScriptService {
  constructor(
    private variableServer: VariableServer,
    private routerServer: RouterServer,
  ) {}
  // первая загрузка при создания проекта
  async DataSetBd() {
    const key = 'isActive';
    const variable = await this.variableServer.getValKey(key);
    if (variable && variable.value === 'true') {
      // await this.variableServer.setValKey(key, 'false');
      return 'Проект активен';
    }
    await this.variableServer.setValKey(key, 'true');
    const userRes = await InsetUserSuper(bdUserRolesRights.user);
    const rolesRes = await insetRoles(bdUserRolesRights.roles);
    const rightsRes = await InsetRights(bdUserRolesRights.rights);
    const rolesRights = await InsetRolesRights(bdUserRolesRights.roles_rights);
    const routerRes = await this.routerServer.savesRouter(
      ConvertRouterToBd(nameAllApi),
    );
    return {
      user: userRes,
      roles: `Созданно roles ${rolesRes}`,
      rights: `Созданно rights ${rightsRes}`,
      rolesRights: rolesRights,
      router: routerRes,
    };
  }
  async DataSetApi() {
    return ConvertRouterToBd(nameAllApi);
  }
}
