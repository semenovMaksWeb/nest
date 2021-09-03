import { getConnection } from 'typeorm';
export async function InsetUserRoles(user_roles) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('user_roles')
    .values(user_roles)
    .execute();
}
