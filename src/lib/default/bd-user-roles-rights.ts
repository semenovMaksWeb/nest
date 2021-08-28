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
      name: 'Админская часть',
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
  router_rights: [
    {
      // регистрация
      authorization: false,
      keyRouter: 'postUser',
    },
    {
      // авторизация
      authorization: false,
      keyRouter: 'postUserToken',
    },
    {
      // получить профиль
      authorization: true,
      keyRouter: 'getUserToken',
    },
    {
      // изменить профиль
      authorization: true,
      keyRouter: 'updateUserProfile',
    },
    {
      // получить все user
      authorization: true,
      keyRouter: 'getUserAll',
      rights: [{ id: 2 }],
    },
    {
      // сохранить роль
      authorization: true,
      keyRouter: 'rolesSave',
      rights: [{ id: 2 }],
    },
    {
      // сохранить роль и право
      authorization: true,
      keyRouter: 'rolesSaveRights',
      rights: [{ id: 2 }],
    },
    {
      // изменять роль
      authorization: true,
      keyRouter: 'rolesUpdate',
      rights: [{ id: 2 }],
    },
    {
      // показывать всё роли
      authorization: true,
      keyRouter: 'rolesAll',
      rightsId: [{ id: 2 }],
    },
    {
      // удалять роли
      authorization: true,
      keyRouter: 'rolesDelete',
      rightsId: [{ id: 2 }],
    },
    {
      // добавить задачу
      authorization: true,
      keyRouter: 'postTodoUser',
    },
    {
      // изменить задачу
      authorization: true,
      keyRouter: 'updateTodoUser',
    },
    {
      // изменить  выполненность задачи
      authorization: true,
      keyRouter: 'updateTodoActiveUser',
    },
    {
      // показать задачи
      authorization: true,
      keyRouter: 'getTodoUser',
    },
    {
      // показать  все задачи
      authorization: true,
      keyRouter: 'getTodoAll',
      rightsId: [{ id: 2 }],
    },
    {
      // показать  все права
      authorization: true,
      keyRouter: 'rightsAll',
      rightsId: [{ id: 2 }],
    },
    {
      // сохранить права
      authorization: true,
      keyRouter: 'rightsSave',
      rightsId: [{ id: 2 }],
    },
    {
      // изменить права
      authorization: true,
      keyRouter: 'rightsUpdate',
      rightsId: [{ id: 2 }],
    },
    {
      // категории проекта
      authorization: true,
      keyRouter: 'categoriesUser',
      rightsId: [{ id: 2 }],
    },
  ],
};
