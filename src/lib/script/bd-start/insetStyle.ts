import { getConnection } from 'typeorm';
export async function insetStyle(styleType, style) {
  const styleTypeRes = await getConnection()
    .createQueryBuilder()
    .insert()
    .into('style_type')
    .values(styleType)
    .execute();
  const styleValueRes = await getConnection()
    .createQueryBuilder()
    .insert()
    .into('style')
    .values(style)
    .execute();
  return {
    styleTypeRes,
    styleValueRes,
  };
}
