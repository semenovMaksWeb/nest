import { getConnection } from 'typeorm';
export async function insetStyle(styleType, style) {
  return {
    styleType: await getConnection()
      .createQueryBuilder()
      .insert()
      .into('style_type')
      .values(styleType)
      .execute(),
    styleValue: await getConnection()
      .createQueryBuilder()
      .insert()
      .into('style')
      .values(style)
      .execute(),
  };
}
