import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsOptional } from 'class-validator';
import { QueryPagination } from 'src/lib/api/pagination';

export class SupportFilterDto extends QueryPagination {
    @ApiModelProperty({ required: false })
    @IsOptional()
    active: boolean;
}
