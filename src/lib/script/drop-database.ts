import { getManager } from 'typeorm';
export async function DropDatabase() {
  const entityManager = getManager();
  await entityManager.query(`DROP DATABASE nest`);
}
