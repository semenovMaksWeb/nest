import { QueryPagination } from 'src/lib/pagination';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class TodoGetFilterDto extends QueryPagination {
  @ApiModelProperty({ required: false })
  @IsString({ message: 'названия задач является строкой' })
  @IsOptional()
  title: string;

  @ApiModelProperty({ required: false })
  //@IsBoolean({ message: 'активность задач является булевым значением' })
  @IsOptional()
  active: boolean;
}
