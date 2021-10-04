export enum ContentHtmlPostTypeInterface {
  div = 'div',
  img = 'img',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  a = 'a',
  nav = 'nav',
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
