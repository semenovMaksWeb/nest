import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

 

export class SupportActiveDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'активность письма поддержки обязательное поле' })
    active: boolean;
}
