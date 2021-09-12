import { TypeVarEnum } from '../../../../interface/type-var.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface errorsResultInterface {
  data?: any;
  element: string;
  text: string;
}
export interface validateParamsInterface {
  id: number;
  description: string;
  name: string;
  type_var: TypeVarEnum;
}

export class ComponentsExampleContent {
  public errors: errorsResultInterface[];
  public validate: validateParamsInterface[];
  public data: any[];
  constructor(validate, data) {
    this.validate = validate;
    this.data = data;
    this.errors = [];
  }
  validateBody() {
    this.data.forEach((element) => {
      this.validateBodyType(element);
      this.validateBodyElementType(element);
    });
    this.checkBodyPosition();
    this.checkBodyValidate();
  }
  validateBodyElementType(element) {
    for (const v of this.validate) {
      if (v.type_var === 'string' || v.type_var === 'boolean') {
        this.validateBodyElementCustomType(v, element);
      }
    }
  }
  validateBodyElementCustomType(v, element) {
    if (typeof element[v.name] !== v.type_var) {
      this.errors.push({
        data: element,
        element: v.name,
        text: `не валидный тип! ожидается ${v.type_var}`,
      });
    }
  }
  validateBodyType(element) {
    let validateTrue = 0;
    for (const v of this.validate) {
      if (element[v.name] === undefined) {
        this.errors400ValidateBody();
      } else {
        validateTrue++;
      }
    }

    if (Object.keys(element).length !== validateTrue) {
      this.errors400ValidateBody();
      return;
    }
  }
  validateBodyElementPositionType(v_name) {
    const elem = [];
    for (const element of this.data) {
      if (typeof element[v_name] !== 'number') {
        this.errors.push({
          data: element,
          element: `не валидное поле ${v_name}`,
          text: 'поле является number',
        });
      }
      if (elem.includes(element[v_name])) {
        this.errors.push({
          element: `не валидное поле ${v_name}`,
          text: `Каждое значение поля ${v_name} уникальное`,
        });

        break;
      } else {
        elem.push(element[v_name]);
      }
    }
  }
  checkBodyPosition() {
    const positionValidate = this.validate.filter(
      (v) => v.type_var === 'position',
    )[0];
    if (positionValidate) {
      this.validateBodyElementPositionType(positionValidate.name);
    }
  }
  checkBodyValidate() {
    if (this.errors.length !== 0) {
      this.errors400ValidateElements();
    } else {
      return true;
    }
  }

  errors400ValidateBody() {
    throw new HttpException('не валидный json', HttpStatus.BAD_REQUEST);
  }
  errors400ValidateElements() {
    throw new HttpException(this.errors, HttpStatus.BAD_REQUEST);
  }
}
