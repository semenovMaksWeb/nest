import {
  ContentHtmlPostType,
  ContentHtmlPostTypeInterface,
} from '../interface/content-html-post.interface';
import { htmlElement } from './element/element';
import { htmlImg } from './element/img';
import { htmlLink } from './element/link';

// const keyAttr = ['class'];

export function ContentHtmlPostValidate(data: ContentHtmlPostType) {
  let errors = [];
  // function validateAttr(data: ContentHtmlPostInterface) {
  //   for (const attrKey in data.attr) {
  //     const attr = data.attr[attrKey];
  //   }
  // }

  function errorsCheck() {
    if (errors.length !== 0) {
      return errors;
    }
    return false;
  }

  function childrenPost(data: ContentHtmlPostType) {
    data.forEach((d) => {
      switch (d.type) {
        case ContentHtmlPostTypeInterface.h1:
        case ContentHtmlPostTypeInterface.h2:
        case ContentHtmlPostTypeInterface.h3:
        case ContentHtmlPostTypeInterface.h4:
        case ContentHtmlPostTypeInterface.h5:
        case ContentHtmlPostTypeInterface.h6:
        case ContentHtmlPostTypeInterface.div:
        case ContentHtmlPostTypeInterface.nav:
        case ContentHtmlPostTypeInterface.p:
          errors = htmlElement(d, errors);
          break;
        case ContentHtmlPostTypeInterface.img:
          errors = htmlImg(d, errors);
          break;
        case ContentHtmlPostTypeInterface.a:
          errors = htmlLink(d, errors);
          break;
        default:
          errors.push({
            content: d,
            text: 'Не валидный json',
          });
      }
      if (d.children && d.children.length !== 0) {
        childrenPost(d.children);
      }
    });
  }
  childrenPost(data);
  return errorsCheck();
}
