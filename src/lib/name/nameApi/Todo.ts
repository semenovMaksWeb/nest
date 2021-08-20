export const Todo = {
  postTodoUser: { type: 'POST', name: '/' },
  updateTodoUser: { type: 'PUT', name: ':id' },
  updateTodoActiveUser: { type: 'PUT', name: '/active/:id' },
  getTodoUser: { type: 'GET', name: '/' },
  getTodoAll: { type: 'GET', name: '/all' },
};
export const nameController = 'todo';
