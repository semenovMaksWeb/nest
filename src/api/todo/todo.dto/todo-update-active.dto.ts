import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TodoUpdateActiveDto {
  @ApiProperty()
  @IsBoolean({ message: 'Активность задачи является булевым значением' })
  @IsNotEmpty({ message: 'Активность задачи обязательным полем' })
  active: boolean;
}
