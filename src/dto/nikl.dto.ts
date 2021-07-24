import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NikDto {
  @ApiProperty()
  @IsString({ message: 'ник должен является строкой' })
  @IsNotEmpty({ message: 'ник обязательное поле' })
  nik: string;
}
