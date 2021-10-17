import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsOptional } from 'class-validator';
import { QueryPagination } from 'src/lib/api/pagination';

export class SupportFilterDto extends QueryPagination {
    @ApiModelProperty({ required: false })
    @IsOptional()
    active: boolean;

    @IsOptional()
    @ApiProperty({ required: false })
    @IsArray({ message: 'Категории поддержки является массивом' })
    categories: number[];
}
