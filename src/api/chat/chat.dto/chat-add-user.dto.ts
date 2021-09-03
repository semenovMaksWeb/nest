import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class ChatAddUserDto {
  @ApiProperty()
  @IsNumber({}, { message: 'id чата  является числом' })
  @IsNotEmpty({ message: 'id чата обязательное поле' })
  chatId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'id пользователя  является числом' })
  @IsNotEmpty({ message: 'id пользователя обязательное поле' })
  userId: number;
}
