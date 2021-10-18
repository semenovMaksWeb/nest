/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/lib/api/pagination';
import { In, Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.server';
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
    private categoriesService: CategoriesService,
  ) { }
  async getSupportId(id: number) {
    const res = await this.supportRepository.findOne(id);
    if (!res) {
      this.errors404Id();
    }
  }

  addWhereSupport(active: boolean, categories: string) {
 
    const where: any = {};
    if (active !== undefined) {
      where.active = active;
    }
    if (categories) {
      const categoriesArrayString = categories.split(",");
      const categoriesArrayNumber:number[] =  [];
      categoriesArrayString.map((e)=>{  
        if (+e === NaN) {
          this.errors400IdsCategoriesNumber();
        }
       categoriesArrayNumber.push(+e);
     });
      where.categories = this.addSqlInCategories(categoriesArrayNumber);
    }
    return where;
  }
  async getSupportAll(param: SupportFilterDto) {
    console.log(param);
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.supportRepository.find({
      where: this.addWhereSupport(param.active, param.categories),
      skip,
      take,
      relations: ['contentHtml', 'categories'],
    });
  }
  convertCategories(data: number[]) {
    const res = []
    data.map((e) => {
      res.push({
        id: e
      })
    })
    return res;
  }

  async postSupport(body: SupportPostDto) {
    await this.categoriesService.categoriesValidateTypeSupport(body.categories);
    const htmlContent = await this.contentHtml.contentHtmlPostResultData(
      body.content,
    );

    await this.supportRepository.save({
      contentHtml: htmlContent,
      categories: this.convertCategories(body.categories)
    });
  }
  async updateActiveSupport(id: number, body: SupportActiveDto) {
    await this.getSupportId(id);
    await this.supportRepository.update(id, {
      active: body.active
    })
    return "состояние письма успешно измененно"
  }
  //  запрос для получение всех support-ids по categories-id
  addSqlInCategories(categoriesId: number[]) {
    return this.supportRepository.query(
      `SELECT DISTINCT "support"."id" FROM "support"
        JOIN "support_categories" ON ("support_categories"."supportId" = "support"."id")
        WHERE "support_categories"."categoriesId" IN (:categories)
        `,
      [categoriesId],
    );
  }


  errors404Id() {
    throw new HttpException(
      "Указанное письмо в поддержку не найдено",
      HttpStatus.NOT_FOUND
    )
  }
  errors400IdsCategoriesNumber() {
    throw new HttpException(
      "Указанные категории не являются числами",
      HttpStatus.NOT_FOUND
    )
  }
}
