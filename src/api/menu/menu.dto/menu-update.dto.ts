import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MemuUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'имя списка меню является строкой' })
    name: string;
    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'ссылка списка меню является строкой' })
    link: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'родитель списка меню является числом' })
    parent: number;

    @IsNotEmpty({ message: 'routerId является обязательным полем' })
    @ApiProperty()
    routerId: number;
}