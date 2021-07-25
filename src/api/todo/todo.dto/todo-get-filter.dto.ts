import { QueryPagination } from 'src/lib/pagination';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class TodoGetFilterDto extends QueryPagination {
  @ApiModelProperty({ required: false })
  @IsNumberString({}, { message: 'категория задач является числом' })
  @IsOptional()
  categories?: string;
  @ApiModelProperty({ required: false })
  @IsString({ message: 'названия задач является строкой' })
  @IsOptional()
  title: string;

  @ApiModelProperty({ required: false })
  //@IsBoolean({ message: 'активность задач является булевым значением' })
  @IsOptional()
  active: boolean;
}
