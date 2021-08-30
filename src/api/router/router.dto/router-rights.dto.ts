import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { RouterRightsElemDto } from './router-rights-elem.dto';

export class RouterRightsDto {
  @ApiProperty({ type: [RouterRightsElemDto] })
  @Type(() => RouterRightsElemDto)
  @IsArray({ message: 'Категории задачи является массивом' })
  @ValidateNested({ message: 'Не валидный массив категории' })
  rights: RouterRightsElemDto[];

  @ApiProperty()
  @IsBoolean({ message: 'требование к авторизации является булевым значение' })
  @IsNotEmpty({
    message: 'требование к авторизации является обязательным полем',
  })
  authorization: boolean;
}
