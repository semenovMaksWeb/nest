import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatPostDto {
  @ApiProperty()
  @IsString({ message: 'имя чата  является строкой' })
  @IsNotEmpty({ message: 'имя чата обязательное поле' })
  name: string;
}
