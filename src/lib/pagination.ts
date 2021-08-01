import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumberString, IsOptional } from 'class-validator';

export class QueryPagination {
  @ApiModelProperty({ required: false, default: 25 })
  @IsNumberString({}, { message: 'количество задач является числом' })
  @IsOptional()
  limit: string;
  @ApiModelProperty({ required: false, default: 1 })
  @IsNumberString({}, { message: 'страница задач является числом' })
  @IsOptional()
  page: string;
}

export function Pagination(limit, page, maxLimit = 25) {
  if (limit > maxLimit || !limit) {
    limit = maxLimit;
  }
  page = page || 1;
  const skip = (page - 1) * limit;
  return {
    skip: skip,
    take: limit,
  };
}
