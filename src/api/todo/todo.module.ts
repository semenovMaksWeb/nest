import { Module } from '@nestjs/common';
import {Todo} from  "./todo.entity"
import {TodoService} from "./todo.server"
@Module({
  imports: [],
  controllers: [],
  providers: [TodoService],
})
export class TodoModule {}
