import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RightsGetRoles {
  @ApiProperty()
  @IsString({ message: 'названия право должен является строкой' })
  @IsOptional({ message: 'название право обязательное поле' })
  name: string;

  @ApiProperty()
  @IsNumber({}, { message: 'id право должен является числом' })
  @IsOptional()
  // @({ message: 'id категории обязательное поле' })
  id: number;
}
