type ResConvert = {
  name: string;
  key: string;
  type: string;
  authorization?: boolean;
  rights?: { id: number }[];
  checkAdmin?: boolean;
  defaultAuthorization: boolean;
  usersRolesAll?: boolean;
};

export function ConvertRouterToBd(router) {
  const res = [];
  for (const routerName in router) {
    for (const routerKey in router[routerName]) {
      const resId: ResConvert = {
        name: `${routerName}${router[routerName][routerKey].name}`,
        key: `${routerKey}`,
        type: `${router[routerName][routerKey].type}`,
        defaultAuthorization:
          router[routerName][routerKey].defaultAuthorization,
        authorization: router[routerName][routerKey].authorization,
      };
      // доступ ко всем авторизованным user
      if (router[routerName][routerKey].usersRolesAll) {
        resId.usersRolesAll = true;
        resId.authorization = true;
        resId.defaultAuthorization = true;
      }
      // требуется права админов
      if (router[routerName][routerKey].checkAdmin) {
        resId.rights = [{ id: 1 }];
        resId.checkAdmin = true;
        resId.defaultAuthorization = true;
        resId.authorization = true;
      }
      res.push(resId);
    }
  }
  return res;
}
