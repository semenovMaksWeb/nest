import { ContentHtmlPostInterface } from '../../interface/content-html-post.interface';

export function htmlImg(data: ContentHtmlPostInterface, errors) {
  if (!data.attr['src']) {
    errors.push({
      content: data,
      text: 'В изображении нету пути к файлу',
    });
  }
  if (!data.attr['alt']) {
    errors.push({
      content: data,
      text: 'В изображении нету аналогичного текста если файл не подключился',
    });
  }

  return errors;
}
