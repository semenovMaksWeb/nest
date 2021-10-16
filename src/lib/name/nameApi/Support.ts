export const Support = {
  getSupportAll: { type: 'GET', name: '/all', checkAdmin: true },
  postSupport: {
    type: 'POST',
    name: '/',
    authorization: false,
    defaultAuthorization: false,
  },
};
export const nameController = 'support';
