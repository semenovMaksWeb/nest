/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/lib/api/pagination';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
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

  async addWhereSupport(
    params: SupportFilterDto,
    sqlCreate: SelectQueryBuilder<Support>
  ) {
    if (params.active !== undefined) {
      sqlCreate.where('active =:active', { active: params.active })
    }
    if (params.categories) {
      const categoriesArrayNumber = this.categoriesService.convertStringToArrayIds(params.categories); 
      const ids = await this.addSqlInCategories(categoriesArrayNumber); 
      const arrayIds = this.categoriesService.convertCategoriesToObjIdInSql(ids);       
      sqlCreate.andWhere(`support.id IN (${arrayIds})`)
    }
  }
  async getSupportAll(param: SupportFilterDto) {
    console.log(param);
    const { skip, take } = Pagination(param?.limit, param?.page);
    const sqlCreate = this.supportRepository.createQueryBuilder('support')
      .take(take)
      .skip(skip)
      .leftJoinAndSelect('support.categories', 'categories')
      // .leftJoinAndSelect('support.contentHtml', 'contentHtml')

    await this.addWhereSupport(param, sqlCreate);

    return await sqlCreate.getMany();
  }

  async postSupport(body: SupportPostDto) {
    await this.categoriesService.categoriesValidateTypeSupport(body.categories);
    const htmlContent = await this.contentHtml.contentHtmlPostResultData(
      body.content,
    );

    await this.supportRepository.save({
      contentHtml: htmlContent,
      categories: this.categoriesService.convertCategoriesToArrayInObjId(body.categories)
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
  async addSqlInCategories(categoriesId: number[]) {
    console.log(categoriesId);    
    return await this.supportRepository.query(
      `SELECT DISTINCT "support"."id" FROM "support"
        JOIN "support_categories" ON ("support_categories"."supportId" = "support"."id")
        WHERE "support_categories"."categoriesId" IN (${categoriesId})
        `,
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
