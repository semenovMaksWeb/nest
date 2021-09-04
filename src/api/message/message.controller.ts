import { RouterName } from '../../decorator/router-name.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Message, nameController } from '../../lib/name/nameApi/Message';
import { UserGuard } from '../user/user.guard';
import { MessageServer } from './message.server';
import { MessagePost } from './message.dto/message-post';
import { MessageGetFilterDto } from './message.dto/message-get-filter.dto';

@ApiBearerAuth()
@ApiTags(nameController)
@Controller(nameController)
@UseGuards(UserGuard)
export class MessageController {
  constructor(private readonly messageServer: MessageServer) {}
  @RouterName('postMessage')
  @Post(Message.postMessage.name)
  async postMessage(
    @Request() req,
    @Body(ValidationPipe) body: MessagePost,
    @Param('id') id: string,
  ) {
    return await this.messageServer.postMessage(req.user, +id, body);
  }

  @RouterName('getMessage')
  @Get(Message.getMessage.name)
  async getMessage(
    @Request() req,
    @Query(ValidationPipe) body: MessageGetFilterDto,
    @Param('id') id: string,
  ) {
    return await this.messageServer.getMessage(req.user, body, +id);
  }
}
