import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TodoController } from './todo.controller';
import { CategoriesModule } from '../categories/categories.module';
import { RouterModule } from '../router/router.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    UserModule,
    CategoriesModule,
    RouterModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
