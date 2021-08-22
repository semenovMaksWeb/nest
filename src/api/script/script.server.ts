import { Injectable } from '@nestjs/common';
import { nameAllApi } from '../../lib/name/nameApi';
import { bdUserRolesRights } from 'src/lib/default/bd-user-roles-rights';

import { InsetUserSuper } from '../../lib/script/InsetUserSuper';
import { insetRoles } from '../../lib/script/insetRoles';
import { InsetRights } from '../../lib/script/insetRights';
import { InsetRolesRights } from '../../lib/script/insetRolesRights';
import { VariableServer } from '../variable/variable.server';

@Injectable()
export class ScriptService {
  constructor(private variableServer: VariableServer) {}
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
    return {
      user: userRes,
      roles: `Созданно roles ${rolesRes}`,
      rights: `Созданно rights ${rightsRes}`,
      rolesRights: rolesRights,
    };
  }
  async DataSetApi() {
    return {
      api: nameAllApi,
    };
  }
}
