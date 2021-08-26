type ResConvert = {
  name: string;
  key: string;
  type: string;
  authorization?: boolean;
  rights?: number[];
};

export function ConvertRouterToBd(router, routerRights) {
  const res = [];
  for (const routerName in router) {
    for (const routerKey in router[routerName]) {
      const resId: ResConvert = {
        name: `${routerName}${router[routerName][routerKey].name}`,
        key: `${routerKey}`,
        type: `${router[routerName][routerKey].type}`,
      };
      const routerId = routerRights.filter((e) => e.keyRouter === routerKey)[0];
      if (routerId) {
        resId.authorization = routerId.authorization;
        resId.rights = routerId.rightsId;
      }
      res.push(resId);
    }
  }
  return res;
}
