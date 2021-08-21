export function uniqueArray(arr, arrBd, key) {
  const unique = [];
  arr.map((e) => {
    if (!arrBd.filter((eBd) => eBd[key] === e[key])[0]) {
      unique.push(e);
    }
  });
  return unique;
}
