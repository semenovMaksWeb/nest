import { getConnection } from 'typeorm';

export async function InsetRolesRights(roles_rights) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('roles_rights')
    .values(roles_rights)
    .execute();
}
