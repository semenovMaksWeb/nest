import { ContentHtmlServer } from './content-html.server';
import { ContentHtml, nameController } from 'src/lib/name/nameApi/ContentHtml';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserGuard } from '../user/user.guard';

import { RouterName } from '../../lib/decorator/router-name.decorator';
import { ContentHtmlPostType } from './interface/content-html-post.interface';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ContentHtmlController {
  constructor(private readonly contentHtmlServer: ContentHtmlServer) {}

  @Post(ContentHtml.contentHtmlPost.name)
  @RouterName('contentHtmlPost')
  async contentHtmlPost(@Body(ValidationPipe) body: ContentHtmlPostType) {
    return await this.contentHtmlServer.contentHtmlPost(body);
  }
  @Get(ContentHtml.contentHtmlGetFormatJson.name)
  @RouterName('contentHtmlGetFormatJson')
  contentHtmlGetFormatJson(@Param('id') id: string) {
    return this.contentHtmlServer.contentHtmlGetFormatJson(+id);
  }
  @Get(ContentHtml.contentHtmlGetFormatHtml.name)
  @RouterName('contentHtmlGetFormatHtml')
  contentHtmlGetFormatHtml(@Param('id') id: string) {
    return this.contentHtmlServer.contentHtmlGetFormatHtml(+id);
  }
}
