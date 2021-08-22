import { getConnection } from 'typeorm';
import { User } from '../../../api/user/user.entity';
import { UserService } from '../../../api/user/user.server';
// функция создания админа супер
export async function InsetUserSuper(user) {
  // поиск user
  const userBd = await getConnection()
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where([{ nik: user.nik, email: user.email }])
    .getOne();
  if (!userBd) {
    //   user нету создаем
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        active: true,
        nik: user.nik,
        password: await UserService.createPassword(user.password),
        email: user.email,
      })
      .execute();
    return 'Пользователь создан';
  } else {
    return 'Пользователь уже существует';
  }
}
