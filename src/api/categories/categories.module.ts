import { Module } from '@nestjs/common';
import { Categories } from './categories.entity';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.server';
import { UserModule } from '../user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Categories]), UserModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}