export const Menu = {
    menuPost: {
      type: 'POST',
      name: '/',
      defaultAuthorization: true,
      authorization: true,
    },
  
    menuUpdate: {
      type: 'PUT',
      name: ':id',
      defaultAuthorization: true,
      authorization: true,
    },
  };
  
  export const nameController = 'menu';
  