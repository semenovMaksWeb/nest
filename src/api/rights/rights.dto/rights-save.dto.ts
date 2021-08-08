import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RightsSaveDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'право пользователя является обязательным полем' })
  @IsString({ message: 'право пользователя является строкой' })
  name: string;
}
