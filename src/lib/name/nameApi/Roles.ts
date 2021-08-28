export const Roles = {
  rolesSave: { type: 'POST', name: '/', checkAdmin: true },
  rolesSaveRights: { type: 'POST', name: '/rights', checkAdmin: true },
  rolesUpdate: { type: 'PUT', name: ':id', checkAdmin: true },
  rolesAll: { type: 'GET', name: '/', checkAdmin: true },
  rolesDelete: { type: 'DELETE', name: ':id', checkAdmin: true },
};
export const nameController = 'roles';
