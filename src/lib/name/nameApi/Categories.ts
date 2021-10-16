export const Categories = {
  categoriesUser: { type: 'GET', name: '/all', checkAdmin: true },
  categoriesPostAdmin:{ type: 'POST', name: '/admin', checkAdmin: true },
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
  categoriesSupport:{
    type: 'GET',
    name: '/support',
    defaultAuthorization: false,
    authorization: false,
  }
};
export const nameController = 'categories';
