import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.server';
import { TodoCreateDto } from './todo.dto/todo-create.dto';
import { UserGuard } from '../user/user.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('todo')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  @UseGuards(UserGuard)
  async postTodoUser(
    @Body(ValidationPipe) todoCreateDto: TodoCreateDto,
    @Request() req,
  ) {
    console.log(req.user.id);
    await this.todoService.postTodoUser(todoCreateDto, req.user.id);
  }
  @Get()
  @UseGuards(UserGuard)
  async getTodoUser(@Request() req) {
    return await this.todoService.getTodoUser(req.user.id);
  }
}
