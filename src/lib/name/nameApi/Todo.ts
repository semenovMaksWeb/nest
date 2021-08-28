export const Todo = {
  postTodoUser: { type: 'POST', name: '/', defaultAuthorization: true },
  updateTodoUser: { type: 'PUT', name: ':id', defaultAuthorization: true },
  updateTodoActiveUser: {
    type: 'PUT',
    name: '/active/:id',
    defaultAuthorization: true,
  },
  getTodoUser: { type: 'GET', name: '/', defaultAuthorization: true },
  getTodoAll: { type: 'GET', name: '/all', checkAdmin: true },
};
export const nameController = 'todo';
