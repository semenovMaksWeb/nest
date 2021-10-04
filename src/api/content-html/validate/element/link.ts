import { ContentHtmlPostInterface } from '../../interface/content-html-post.interface';

export function htmlLink(data: ContentHtmlPostInterface, errors) {
  if (!data.attr['href']) {
    errors.push({
      content: data,
      text: 'В ссылке нету пути',
    });
  }
  return errors;
}
