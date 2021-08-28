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
  // router_rights: [
  //   {
  //     // регистрация
  //     authorization: false,
  //     keyRouter: 'postUser',
  //   },
  //   {
  //     // авторизация
  //     authorization: false,
  //     keyRouter: 'postUserToken',
  //   },
  //   {
  //     // получить профиль
  //     authorization: true,
  //     keyRouter: 'getUserToken',
  //   },
  //   {
  //     // изменить профиль
  //     authorization: true,
  //     keyRouter: 'updateUserProfile',
  //   },
  //   {
  //     // получить все user
  //     authorization: true,
  //     keyRouter: 'getUserAll',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // сохранить роль
  //     authorization: true,
  //     keyRouter: 'rolesSave',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // сохранить роль и право
  //     authorization: true,
  //     keyRouter: 'rolesSaveRights',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // изменять роль
  //     authorization: true,
  //     keyRouter: 'rolesUpdate',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // показывать всё роли
  //     authorization: true,
  //     keyRouter: 'rolesAll',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // удалять роли
  //     authorization: true,
  //     keyRouter: 'rolesDelete',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // добавить задачу
  //     authorization: true,
  //     keyRouter: 'postTodoUser',
  //   },
  //   {
  //     // изменить задачу
  //     authorization: true,
  //     keyRouter: 'updateTodoUser',
  //   },
  //   {
  //     // изменить  выполненность задачи
  //     authorization: true,
  //     keyRouter: 'updateTodoActiveUser',
  //   },
  //   {
  //     // показать задачи
  //     authorization: true,
  //     keyRouter: 'getTodoUser',
  //   },
  //   {
  //     // показать  все задачи
  //     authorization: true,
  //     keyRouter: 'getTodoAll',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // показать  все права
  //     authorization: true,
  //     keyRouter: 'rightsAll',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // сохранить права
  //     authorization: true,
  //     keyRouter: 'rightsSave',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // изменить права
  //     authorization: true,
  //     keyRouter: 'rightsUpdate',
  //     rights: [{ id: 1 }],
  //   },
  //   {
  //     // категории проекта
  //     authorization: true,
  //     keyRouter: 'categoriesUser',
  //     rights: [{ id: 1 }],
  //   },
  // ],
};
