export const User = {
  postUser: {
    type: 'POST',
    name: '/',
    defaultAuthorization: true,
    authorization: false,
  },
  postUserToken: {
    type: 'POST',
    name: '/authorization',
    defaultAuthorization: false,
    authorization: true,
  },
  getUserAll: { type: 'GET', name: '/all', checkAdmin: true },
  getUserToken: {
    type: 'GET',
    name: '/profile',
    usersRolesAll: true,
  },
  updateUserProfile: {
    type: 'PUT',
    name: '/profile',
    usersRolesAll: true,
  },
};
export const nameController = 'users';
