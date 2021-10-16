// eslint-disable-next-line @typescript-eslint/no-var-requires
const Window = require('window');
const window = new Window();
function transformHtml(data: any, res: any) {
  data.forEach((e) => {
    const elem = window.document.createElement(e.type);
    for (const attrKey in e.attr) {
      const attr = e.attr[attrKey];
      elem.setAttribute(attrKey, attr);
    }
    if (e.innerText) {
      elem.innerHTML = e.innerText;
    }
    res.append(elem);
    if (e.children && e.children.length > 0) {
      transformHtml(e.children, elem);
    }
  });
}

export function TransformJsonHtml(data: any) {
  const body: any = window.document.createElement('body');
  transformHtml(data, body);
  return body.innerHTML.replace(/"/gi, "'");
}
