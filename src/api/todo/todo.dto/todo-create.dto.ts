import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoriesGetTodoDto } from '../../categories/categories.dto/categories-get-todo.dto';

export class TodoCreateDto {
  @ApiProperty()
  @IsString({ message: 'название задачи должен является строкой' })
  @IsNotEmpty({ message: 'название задачи обязательное поле' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'описание задачи должен является строкой' })
  @IsNotEmpty({ message: 'описание задачи обязательное поле' })
  text: string;

  @ApiProperty({ type: [CategoriesGetTodoDto] })
  @Type(() => CategoriesGetTodoDto)
  @IsArray({ message: 'Категории задачи является массивом' })
  @ValidateNested({ message: 'Не валидный массив категории' })
  categories: CategoriesGetTodoDto[];
}
