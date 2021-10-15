import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateComponentsExampleParamsDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'значения параметра для компонента обязательное поле' })
  value: any
}
