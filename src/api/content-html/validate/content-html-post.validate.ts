import {
  ContentHtmlPostType,
  ContentHtmlPostTypeInterface,
} from '../interface/content-html-post.interface';
import { htmlDiv } from './element/div';
import { htmlImg } from './element/img';
import { log } from 'util';

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
      if (d.type === ContentHtmlPostTypeInterface.div) {
        errors = htmlDiv(d, errors);
      } else if (d.type === ContentHtmlPostTypeInterface.img) {
        errors = htmlImg(d, errors);
      } else {
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
