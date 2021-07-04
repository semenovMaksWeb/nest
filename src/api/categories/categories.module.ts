import { Module } from '@nestjs/common';
import {Categories} from  "./categories.entity"
import {CategoriesService} from "./categories.server"
@Module({
  imports: [],
  controllers: [],
  providers: [CategoriesService],
})
export class CategoriesModule {}
