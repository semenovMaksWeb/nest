export const Message = {
  postMessage: {
    type: 'POST',
    name: ':id',
    defaultAuthorization: true,
    authorization: true,
  },

  getMessage: {
    type: 'GET',
    name: ':id',
    defaultAuthorization: true,
    authorization: true,
  },
};
export const nameController = 'message';
