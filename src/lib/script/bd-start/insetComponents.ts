import { getConnection } from 'typeorm';

export async function InsetComponents(
  components,
  componentsContent,
  componentsStyle,
) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('components')
    .values(components)
    .execute();

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('components_var')
    .values(componentsStyle)
    .execute();

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('components_content')
    .values(componentsContent)
    .execute();
  return {
    components,
    componentsContent,
    componentsStyle,
  };
}
