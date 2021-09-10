import { EmailDto } from 'src/lib/dto/email.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { PasswordDto } from 'src/lib/dto/password.dto';
import { NikDto } from 'src/lib/dto/nikl.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserPostDto extends IntersectionType(
  EmailDto,
  PasswordDto,
  NikDto,
) {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  nik: string;
}
