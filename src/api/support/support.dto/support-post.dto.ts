import { ApiProperty } from '@nestjs/swagger';
import { ContentHtmlPostType } from 'src/api/content-html/interface/content-html-post.interface';

export class SupportPostDto {
  @ApiProperty()
  content: ContentHtmlPostType;
}
