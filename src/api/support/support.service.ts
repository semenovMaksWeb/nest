/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/lib/api/pagination';
import { Repository } from 'typeorm';
import { ContentHtmlServer } from '../content-html/content-html.server';
import { SupportFilterDto } from './support.dto/support-filter.dto';
import { SupportPostDto } from './support.dto/support-post.dto';
import { Support } from './support.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private supportRepository: Repository<Support>,
    private contentHtml: ContentHtmlServer,
  ) {}
  async getSupportAll(param: SupportFilterDto) {
    const { skip, take } = Pagination(param?.limit, param?.page);
    await this.supportRepository.find({
      skip,
      take,
      relations: ['ContentHtml'],
    });
  }
  async postSupport(body: SupportPostDto) {
    const htmlContent = await this.contentHtml.contentHtmlPostResultData(
      body.content,
    );
    await this.supportRepository.save({
      contentHtml: htmlContent,
    });
  }
}
