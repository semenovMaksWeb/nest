import { ComponentsExampleTypeEnum } from '../../../../interface/components-example-type.enum';

export interface ComponentsExampleParamsBodySaveInterface {
  type_var: ComponentsExampleTypeEnum;
  componentsExample: {
    id: number;
  };
  name_params: string;
  value: any;
}
