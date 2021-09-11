import { getConnection } from 'typeorm';
export async function insetStyle(styleType, style) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('style_type')
    .values(styleType)
    .execute();
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('style')
    .values(style)
    .execute();
  return {
    styleTypeRes: styleType,
    styleValueRes: style,
  };
}
