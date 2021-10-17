import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CategoriesGetTodoDto } from 'src/api/categories/categories.dto/categories-get-todo.dto';
import { ContentHtmlPostType } from 'src/api/content-html/interface/content-html-post.interface';

export class SupportPostDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'id категории обязательное поле' })
  @ApiProperty({ type: Number })
  @IsArray({ message: 'Категории задачи является массивом' })
  categories: number[];
 
  @ApiProperty()
  @IsNotEmpty({ message: 'Письмо поддержки является обязательным полем' })
  content: ContentHtmlPostType;
}
