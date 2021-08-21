import { Rights } from '../../api/rights/rights.entity';
import { getConnection } from 'typeorm';
import { uniqueArray } from './uniqueScript';
export async function InsetRights(rights) {
  const rightsName = rights.map((e) => e.name);
  const rightsBd = await getConnection()
    .createQueryBuilder()
    .select('rights')
    .from(Rights, 'rights')
    .where('rights.name IN (:...name)', { name: rightsName })
    .getMany();

  const uniqueRights = uniqueArray(rights, rightsBd, 'name');

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Rights)
    .values(uniqueRights)
    .execute();
  return uniqueRights.length;
}
