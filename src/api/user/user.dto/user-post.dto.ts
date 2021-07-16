import { EmailDto } from 'src/dto/email.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { PasswordDto } from 'src/dto/password.dto';
import { NikDto } from 'src/dto/nikl.dto';

export class UserPostDto extends IntersectionType(
  EmailDto,
  PasswordDto,
  NikDto,
) {}
