export const ComponentsExampleParams = {
  postComponentsExampleParamsContent: {
    type: 'POST',
    name: 'content/:id',
    checkAdmin: true,
  },
  postComponentsExampleParamsVar: {
    type: 'POST',
    name: 'var/:id',
    checkAdmin: true,
  },
  getComponentsExampleParamsIdVar: {
    type: 'GET',
    name: 'var/:id',
    defaultAuthorization: true,
    authorization: false,
  },
  getComponentsExampleParamsIdContent: {
    type: 'GET',
    name: 'content/:id',
    defaultAuthorization: true,
    authorization: false,
  },
  updateComponentsExampleParams: {
    type: 'PUT',
    name: ':id',
    checkAdmin: true,
  },
};
export const nameController = 'components_example_params';
