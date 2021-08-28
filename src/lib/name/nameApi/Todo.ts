export const Todo = {
  postTodoUser: {
    type: 'POST',
    name: '/',
    defaultAuthorization: true,
    authorization: true,
  },
  updateTodoUser: {
    type: 'PUT',
    name: ':id',
    defaultAuthorization: true,
    authorization: true,
  },
  updateTodoActiveUser: {
    type: 'PUT',
    name: '/active/:id',
    defaultAuthorization: true,
    authorization: true,
  },
  getTodoUser: {
    type: 'GET',
    name: '/',
    defaultAuthorization: true,
    authorization: true,
  },
  getTodoAll: { type: 'GET', name: '/all', checkAdmin: true },
};
export const nameController = 'todo';
