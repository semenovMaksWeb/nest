import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('categoriesRepository')
    private categoriesRepository: Repository<Categories>,
  ) {}
}
