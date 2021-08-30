import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class RouterRightsElemDto {
  @ApiProperty()
  @IsNumber({}, { message: 'id категории должен является числом' })
  @IsNotEmpty({ message: 'id право обязательное поле' })
  id: number;
}
