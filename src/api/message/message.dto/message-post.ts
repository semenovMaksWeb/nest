import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessagePost {
  @ApiModelProperty()
  @IsString({ message: 'текст сообщение должен является строкой' })
  @IsNotEmpty({ message: 'текст сообщение обязательное поле' })
  text: string;
}
