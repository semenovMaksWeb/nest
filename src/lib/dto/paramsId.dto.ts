import { IsNumberString } from 'class-validator';
export class ParamsIdDto {
  @IsNumberString({}, { message: 'id является числом' })
  id: string;
}
