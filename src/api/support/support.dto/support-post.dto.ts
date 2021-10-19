import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ContentHtmlPostType } from 'src/api/content-html/interface/content-html-post.interface';

export class SupportPostDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'id категории обязательное поле' })
  @ApiProperty({ type: Number })
  @IsArray({ message: 'Категории поддержки является массивом' })
  categories: number[];

  @ApiProperty()
  @IsNotEmpty({ message: 'названия письма поддержки является обязательным полем' })
  title: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Письмо поддержки является обязательным полем' })
  content: ContentHtmlPostType;
}
