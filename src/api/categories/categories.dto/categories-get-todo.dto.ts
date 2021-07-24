import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoriesGetTodoDto {
  @ApiProperty()
  @IsString({ message: 'название задачи должен является строкой' })
  @IsNotEmpty({ message: 'название задачи обязательное поле' })
  name: string;

  @ApiProperty()
  @IsNumber({}, { message: 'id категории должен является числом' })
  @IsOptional()
  // @({ message: 'id категории обязательное поле' })
  id: number;
}
