export const Support = {
  getSupportAll: { type: 'GET', name: '/all', checkAdmin: true },
  postSupport: {
    type: 'POST',
    name: '/',
    authorization: false,
    defaultAuthorization: false,
  },
  updateActiveSupport:{
    type: 'PUT', name: ':id', checkAdmin: true
  }
};
export const nameController = 'support';
