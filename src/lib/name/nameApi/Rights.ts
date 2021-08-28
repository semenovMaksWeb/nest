export const Rights = {
  rightsAll: { type: 'POST', name: '/all', checkAdmin: true },

  rightsSave: { type: 'POST', name: '/', checkAdmin: true },
  rightsUpdate: { type: 'PUT', name: ':id', checkAdmin: true },
};
export const nameController = 'rights';
