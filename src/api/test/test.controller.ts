import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.server';
import { ApiTags } from '@nestjs/swagger';

@Controller('test')
@ApiTags('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get('todo')
  async GetTodo() {
    return await this.testService.getTodo();
  }
}
