import { TypeVarEnum } from 'src/interface/type-var.enum';
import { ComponentsContent } from '../../components-content/components-content.entity';
import { UpdateComponentsExampleParamsDto } from '../components-example-params.dto/update-components-example-params.dto';
import { ComponentsContentExampleParams } from '../components-example-params.entity';
import { TypeConvertInterface } from '../components-example-params.interface/type-convert.interface';

export function convertDataBdToReturn(
  data,
  type = TypeConvertInterface.array,
  validate?: ComponentsContent[],
) {
  if (type === TypeConvertInterface.object) {
    return convertDataBdObject(data);
  }
  if (type === TypeConvertInterface.array) {
    return convertDataBdArray(data, validate);
  }
}
function validateConvertType(value: string, type: TypeVarEnum) {
  if (type === TypeVarEnum.boolean) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  }
  if (type === TypeVarEnum.number || type === TypeVarEnum.position) {
    return +value;
  }
  if (type === TypeVarEnum.string) {
    return value;
  }
}
function convertValidate(validate: ComponentsContent[]) {
  const res = {};
  validate.map((e) => {
    res[e.name] = e.type_var;
  });
  return res;
}

function convertDataBdArray(data, validate: ComponentsContent[]) {
  const convert_validate = convertValidate(validate);
  const res = [];
  let idElem = null;
  let index = -1;
  data.sort((a, b) => {
    if (a.elemId > b.elemId) {
      return 1;
    } else if (a.elemId < b.elemId) {
      return -1;
    }
    return 0;
  });
  data.forEach((e) => {
    if (idElem === null || idElem !== e.elemId) {
      idElem = e.elemId;
      index++;
      res[index] = {};
    }
    res[index][e.name_params] = validateConvertType(
      e.value,
      convert_validate[e.name_params],
    );
  });
  return res;
}
function convertDataBdObject(data) {
  const res = {};
  data.forEach((e) => {
    res[e.name_params] = e.value;
  });
  return res;
}
export function convertParamsContentUpdate(
  elem: ComponentsContentExampleParams[],
  data: UpdateComponentsExampleParamsDto,
  id: number,
  validate: ComponentsContent[],
) {
  elem.filter((e: ComponentsContentExampleParams) => e.id === id)[0].value =
    data.value;
  return convertDataBdToReturn(elem, TypeConvertInterface.array, validate);
}
