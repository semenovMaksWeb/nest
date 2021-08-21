import { getConnection } from 'typeorm';
export async function InsetRolesRights(roles_rights) {
  const rolesBd = await getConnection()
    .createQueryBuilder()
    .select('roles_rights')
    .from('roles_rights', 'roles_rights')
    .getMany();
  return rolesBd;
}
