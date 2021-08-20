import { Injectable } from '@nestjs/common';
import { nameAllApi } from '../../lib/name/nameApi';
import { bdUserRolesRights } from 'src/lib/default/bd-user-roles-rights';

import { InsetUserSuper } from '../../lib/script/InsetUserSuper';
import { insetRoles } from '../../lib/script/insetRoles';

@Injectable()
export class ScriptService {
  // первая загрузка при создания проекта
  async DataSetBd() {
    const userRes = await InsetUserSuper(bdUserRolesRights.user);
    const rolesRes = await insetRoles(bdUserRolesRights.roles);
    return {
      user: userRes,
      roles: `Созданно roles ${rolesRes}`,
    };
  }
  async DataSetApi() {
    return {
      api: nameAllApi,
    };
  }
}
