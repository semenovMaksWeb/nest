import { ContentHtmlPostInterface } from '../../interface/content-html-post.interface';

export function htmlDiv(data: ContentHtmlPostInterface, errors) {
  if (!data.innerText && data?.children?.length === 0) {
    errors.push({
      content: data,
      text: 'Пустая div без потомков и текста',
    });
  }
  return errors;
  // validateAttr(data);
}
