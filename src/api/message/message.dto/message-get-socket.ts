import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MessageGetSocket {
  @ApiModelProperty()
  // @IsNumber({}, { message: 'id чата должен является строкой' })
  @IsNotEmpty({ message: 'id чата обязательное поле' })
  id: number;
}
