import { IsString, IsNotEmpty } from 'class-validator';
import { EmailDto } from 'src/dto/email.dto';

export class UserAuthorizationDto extends EmailDto {
  @IsString({ message: 'пароль должен является строкой' })
  @IsNotEmpty({ message: 'пароль обязательное поле' })
  password: string;
}
