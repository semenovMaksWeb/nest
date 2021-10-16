import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesCreateAdminDto {
  @ApiProperty()
  @IsString({ message: 'название категории должен является строкой' })
  @IsNotEmpty({ message: 'название категории обязательное поле' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'название типа категории должен является строкой' })
  type:string;
}
