export const ContentHtml = {
  contentHtmlPost: {
    type: 'POST',
    name: '/',
    checkAdmin: true,
  },
  contentHtmlGetFormatHtml: {
    type: 'GET',
    name: '/html:id',
    checkAdmin: true,
  },
  contentHtmlGetFormatJson: {
    type: 'GET',
    name: '/json:id',
    checkAdmin: true,
  },
};
export const nameController = 'contentHtml';
