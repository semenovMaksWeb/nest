import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesCreateDto {
  @ApiProperty()
  @IsString({ message: 'название задачи должен является строкой' })
  @IsNotEmpty({ message: 'название задачи обязательное поле' })
  name: string;
}
