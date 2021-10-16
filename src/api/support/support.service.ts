/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/lib/api/pagination';
import { Repository } from 'typeorm';
import { ContentHtmlServer } from '../content-html/content-html.server';
import { SupportActiveDto } from './support.dto/support-active.dto';
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
    async getSupportId(id:number){
       const res =  await this.supportRepository.findOne(id);
       if (!res) {
         this.errors404Id();
       }
    }
    addWhereSupportActive(active){
      if (active !== undefined) {
        return {active:active}
    }
  }
  async getSupportAll(param: SupportFilterDto) {
    console.log(param);    
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.supportRepository.find({
      where: this.addWhereSupportActive(param.active),
      skip,
      take,
      relations: ['contentHtml'],
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
  async updateActiveSupport(id:number, body:SupportActiveDto){
    await this.getSupportId(id);
    await this.supportRepository.update(id, {
      active: body.active
    })
    return "состояние письма успешно измененно"
  }

  errors404Id(){
    throw new HttpException(
        "Указанное письмо в поддержку не найдено",
        HttpStatus.NOT_FOUND
    )
    
  }
}
