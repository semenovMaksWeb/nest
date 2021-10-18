import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { QueryPagination } from 'src/lib/api/pagination';

export class SupportFilterDto extends QueryPagination {
    @ApiModelProperty({ required: false })
    @IsOptional()
    active: boolean;

    @ApiProperty({required: false})
    @IsOptional()
    categories: string;


 
}
