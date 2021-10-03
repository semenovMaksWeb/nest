export enum ContentHtmlPostTypeInterface {
  div = 'div',
  img = 'img',
}

export interface ContentHtmlPostInterface {
  type: ContentHtmlPostTypeInterface;
  attr: {
    [key: string]: any;
  };
  innerText?: string;
  children: ContentHtmlPostInterface[];
}
export type ContentHtmlPostType = ContentHtmlPostInterface[];
