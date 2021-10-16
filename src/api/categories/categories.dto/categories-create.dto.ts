import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesCreateDto {
  @ApiProperty()
  @IsString({ message: 'название категории должен является строкой' })
  @IsNotEmpty({ message: 'название категории обязательное поле' })
  name: string;
}
