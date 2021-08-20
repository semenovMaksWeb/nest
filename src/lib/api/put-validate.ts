import { HttpException, HttpStatus } from '@nestjs/common';

type typeParams = {
  validate: number | undefined;
  callbackTrue: string;
  callbackFalse: string;
};
export function PutValidate(params: typeParams): string {
  if (params.validate) {
    return params.callbackTrue;
  } else {
    throw new HttpException(params.callbackFalse, HttpStatus.NOT_FOUND);
  }
}
