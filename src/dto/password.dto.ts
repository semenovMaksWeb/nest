// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PasswordDto {
  // @ApiProperty()
  @IsString({ message: 'пароль должен является строкой' })
  @IsNotEmpty({ message: 'пароль обязательное поле' })
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'слишком легкий пароль' },
  )
  password: string;
}
