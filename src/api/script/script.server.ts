import { Injectable } from '@nestjs/common';
import { nameAllApi } from '../../lib/name/nameApi';
import { bdUserRolesRights } from 'src/lib/default/bd-user-roles-rights';

import { InsetUserSuper } from '../../lib/script/InsetUserSuper';
import { insetRoles } from '../../lib/script/insetRoles';
import { InsetRights } from '../../lib/script/insetRights';
import { InsetRolesRights } from '../../lib/script/insetRolesRights';
import { DropDatabase } from '../../lib/script/drop-database';

@Injectable()
export class ScriptService {
  // первая загрузка при создания проекта
  async DataSetBd() {
    await DropDatabase();
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
