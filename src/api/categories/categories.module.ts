import { Module } from '@nestjs/common';
import { Categories } from './categories.entity';
// import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CategoriesService } from './categories.server';
@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  // controllers: [CategoriesController],
  // providers: [CategoriesService],
})
export class CategoriesModule {}
