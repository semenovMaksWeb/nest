import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ContentHtml } from './content-html.entity';
import { ContentHtmlPostType } from './interface/content-html-post.interface';
import { ContentHtmlPostValidate } from './validate/content-html-post.validate';
import { TransformJsonHtml } from './transform/transform-json-html';

@Injectable()
export class ContentHtmlServer {
  constructor(
    @InjectRepository(ContentHtml)
    private userRepository: Repository<ContentHtml>,
  ) {}

  async contentHtmlPost(data: ContentHtmlPostType) {
    const errors = ContentHtmlPostValidate(data);
    if (errors) {
      this.errors400(errors);
    }
    await this.userRepository.save({ content: JSON.stringify(data) });
    return 'Успешно сохраненно!';
  }
  async contentHtmlGetFormatHtml(id: number) {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      this.errors404();
    }
    data.content = JSON.parse(data.content);
    data.content = TransformJsonHtml(data.content);
    return data;
  }
  async contentHtmlGetFormatJson(id: number) {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      this.errors404();
    }
    data.content = JSON.parse(data.content);
    return data;
  }

  errors400(errors) {
    throw new HttpException(errors, HttpStatus.BAD_REQUEST);
  }
  errors404() {
    throw new HttpException('Контент не найден', HttpStatus.NOT_FOUND);
  }
}
