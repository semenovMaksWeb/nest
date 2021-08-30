export const Router = {
  getRouterAll: { type: 'GET', name: '/', checkAdmin: true },
  setRouterRights: { type: 'POST', name: ':id/rights', checkAdmin: true },
};
export const nameController = 'router';
