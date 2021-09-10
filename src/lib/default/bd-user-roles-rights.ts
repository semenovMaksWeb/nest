export const bdUserRolesRights = {
  roles: [
    {
      id: 1,
      name: 'Пользователь',
      system: true,
      description:
        'обычный пользователь который может зарегистрироваться и пользоваться проектом созданным на платформе',
    },
    {
      id: 2,
      name: 'Админ',
      system: true,
      description:
        'администратор проекта которые имеет доступ к своему проекту и выполнять какие либо действия',
    },
    {
      id: 3,
      name: 'СуперАдмин',
      system: true,
      description:
        'администратор или разработчик, который имеет доступ к всему api, кодовой базе платформы',
      visible: false,
    },
  ],
  rights: [
    {
      id: 1,
      name: 'Админская часть',
      system: true,
      description: 'право для контент менеджеров и админов проекта',
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
};
