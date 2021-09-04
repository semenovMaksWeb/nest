export const Chat = {
  postChatUser: {
    type: 'POST',
    name: '/',
    defaultAuthorization: true,
    authorization: true,
  },
  postChatAddUser: {
    type: 'POST',
    name: '/users',
    defaultAuthorization: true,
    authorization: true,
  },
  getMyChats: {
    type: 'GET',
    name: '/my',
    defaultAuthorization: true,
    authorization: true,
  },
  getChatAll: { type: 'GET', name: '/all', checkAdmin: true },
  getChatsId: {
    type: 'GET',
    name: ':id',
    defaultAuthorization: true,
    authorization: true,
  },

  getChatsUser: {
    type: 'GET',
    name: '/',
    defaultAuthorization: true,
    authorization: true,
  },
};
export const nameController = 'chat';
