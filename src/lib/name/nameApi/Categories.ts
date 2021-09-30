export const Categories = {
  categoriesUser: { type: 'GET', name: '/all', checkAdmin: true },
  categoriesPost: {
    type: 'POST',
    name: '/',
    defaultAuthorization: true,
    authorization: true,
  },
  updateCategoriesTodoUser: {
    type: 'PUT',
    name: ':id',
    defaultAuthorization: true,
    authorization: true,
  },
  deleteCategoriesTodoUser: {
    type: 'DELETE',
    name: ':id',
    defaultAuthorization: true,
    authorization: true,
  },
};
export const nameController = 'categories';
