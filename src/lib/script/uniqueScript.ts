export function uniqueArray(arr: any[], arrBd: any[], key: any) {
  const unique = [];
  arr.map((e) => {
    if (!arrBd.filter((eBd) => eBd[key] === e[key])[0]) {
      unique.push(e);
    }
  });
  return unique;
}
