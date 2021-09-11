import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ComponentsExamplePostDto {
  @ApiProperty()
  @IsNumber({}, { message: 'id компонента должен является числом' })
  @IsNotEmpty({ message: 'id компонента обязательное поле' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'названия экземпляра компонента обязательное поле' })
  @IsString({
    message: 'названия экземпляра компонента должен является строкой',
  })
  name: string;

  @ApiProperty()
  description?: string;
}
