export function ConvertRouterToBd(router) {
  const res = [];
  for (const routerName in router) {
    for (const routerKey in router[routerName]) {
      res.push({
        name: `${routerName}${router[routerName][routerKey].name}`,
        key: `${routerKey}`,
        type: `${router[routerName][routerKey].type}`,
      });
    }
  }
  return res;
}
