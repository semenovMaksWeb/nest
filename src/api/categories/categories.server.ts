import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesGetTodoDto } from './categories.dto/categories-get-todo.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async saveCategoriesTodo(
    categories: CategoriesGetTodoDto[],
  ): Promise<Categories[]> {
    return await this.categoriesRepository.save(categories);
  }
}
