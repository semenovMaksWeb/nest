import { QueryPagination } from 'src/lib/api/pagination';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoriesGetTodoDto } from 'src/api/categories/categories.dto/categories-get-todo.dto';
import { Type } from 'class-transformer';

export class TodoGetFilterDto extends QueryPagination {
  @ApiModelProperty({ required: false })
  @IsString({ message: 'названия задач является строкой' })
  @IsOptional()
  title: string;

  @ApiModelProperty({ required: false })
  // @IsBoolean({ message: 'активность задач является булевым значением' })
  @IsOptional()
  active: boolean;

  @ApiModelProperty({ required: false  })
  @IsOptional()
  categories: string;

}
