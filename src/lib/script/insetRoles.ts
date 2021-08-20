import { Roles } from '../../api/roles/roles.entity';
import { getConnection } from 'typeorm';
export async function insetRoles(roles) {
  const rolesName = roles.map((e) => e.name);
  const rolesBd = await getConnection()
    .createQueryBuilder()
    .select('roles')
    .from(Roles, 'roles')
    .where('roles.name IN (:...name)', { name: rolesName })
    .getMany();

  const uniqueRoles = [];
  roles.map((e) => {
    if (!rolesBd.filter((eBd) => eBd.name === e.name)[0]) {
      uniqueRoles.push(e);
    }
  });
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Roles)
    .values(uniqueRoles)
    .execute();
  return uniqueRoles.length;
}
