export const bdUserRolesRights = {
  roles: [
    {
      id: 1,
      name: 'Пользователь',
    },
    {
      id: 2,
      name: 'Админ',
    },
    {
      id: 3,
      name: 'СуперАдмин',
    },
  ],
  rights: [
    {
      id: 1,
      name: 'доступ ко всему!',
    },
    {
      id: 2,
      name: 'Работа с правами',
    },
    {
      id: 3,
      name: 'Работа с ролями',
    },
    {
      id: 4,
      name: 'Работа с пользователями',
    },
  ],
  user: {
    id: 1,
    active: true,
    email: 'AdminTest@mail.ru',
    nik: 'SyperAdmin',
    password: 'SyperAdminAdminTest6543125',
  },
  user_roles: [
    {
      userId: 1,
      rolesId: 3,
    },
  ],
  roles_rights: [
    {
      rolesId: 3,
      rightsId: 1,
    },
  ],
};
