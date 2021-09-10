import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty()
  @IsEmail(undefined, { message: 'не коррентно указан емайл' })
  @IsString({ message: 'емайл должен является строкой' })
  @IsNotEmpty({ message: 'емайл обязательное поле' })
  email: string;
}
