import { IsString, IsNotEmpty } from 'class-validator';
import { EmailDto } from 'src/lib/dto/email.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UserAuthorizationDto extends EmailDto {
  @ApiProperty()
  @IsString({ message: 'пароль должен является строкой' })
  @IsNotEmpty({ message: 'пароль обязательное поле' })
  password: string;
}
