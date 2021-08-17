import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RolesSaveDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'роль является обязательным полем' })
  @IsString({ message: 'роль пользователя является строкой' })
  name: string;
}
