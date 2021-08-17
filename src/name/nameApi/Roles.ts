export const Roles = {
  rolesSave: { type: 'POST', name: '/' },
  rolesSaveRights: { type: 'POST', name: '/rights' },
  rolesUpdate: { type: 'PUT', name: ':id' },
  rolesAll: { type: 'GET', name: '/' },
  rolesDelete: { type: 'DELETE', name: ':id' },
};
export const nameController = 'roles';
