import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
// import { TodoService } from './todo.server';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [],
  // providers: [TodoService], 
})
export class TodoModule {}
