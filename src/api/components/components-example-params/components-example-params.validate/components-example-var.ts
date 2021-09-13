import { HttpException, HttpStatus } from '@nestjs/common';

export interface validateParamsInterface {
  id: number;
  description: string;
  var_name: string;
  style: {
    id: number;
    name: string;
  };
}
export class ComponentsExampleVar {
  public errors: string[];
  public data: any;
  private validate: validateParamsInterface[];
  constructor(validate, data) {
    this.validate = validate;
    this.data = data;
    this.errors = [];
  }

  checkValidateValue(
    validateName: validateParamsInterface,
    str: string,
    key: string,
  ) {
    if (!this.isStyle(str, validateName.style.name)) {
      this.errors.push(`переменная ${key} не валидная`);
    }
  }
  checkValidateNameVar(validateName: validateParamsInterface, key: string) {
    if (!validateName) {
      this.errors.push(`переменная ${key} не существует`);
    } else {
      return true;
    }
  }

  checkValidateAll() {
    if (this.errors.length !== 0) {
      this.errors400ValidateElements();
    } else {
      return true;
    }
  }

  validateBody() {
    for (const key in this.data) {
      const str = this.data[key];
      const validateName = this.validate.filter((v) => v.var_name === key)[0];
      // валидация существование переменной
      if (this.checkValidateNameVar(validateName, key)) {
        // валидация значения переменной
        this.checkValidateValue(validateName, str, key);
      }
    }
    return this.checkValidateAll();
  }
  errors400ValidateElements() {
    throw new HttpException(this.errors, HttpStatus.BAD_REQUEST);
  }
  isStyle = (str, name) => {
    const s = new Option().style;
    s[name] = str;
    return s[name] !== '';
  };
}
