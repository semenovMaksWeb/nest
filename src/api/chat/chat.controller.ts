import { RouterName } from '../../decorator/router-name.decorator';
import { Chat, nameController } from 'src/lib/name/nameApi/Chat';
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
import { UserGuard } from '../user/user.guard';
import { ChatServer } from './chat.server';
import { ChatPostDto } from './chat.dto/chat-post.dto';
import { ChatAddUserDto } from './chat.dto/chat-add-user.dto';
import { ChatGetFilterDto } from './chat.dto/chat-get-filter.dto';

@ApiTags(nameController)
@ApiBearerAuth()
@Controller(nameController)
@UseGuards(UserGuard)
export class ChatController {
  constructor(private readonly chatServer: ChatServer) {}
  @RouterName('postChatUser')
  @Post(Chat.postChatUser.name)
  async postChatUser(@Request() req, @Body(ValidationPipe) body: ChatPostDto) {
    return await this.chatServer.postChat(req.user, body);
  }

  @RouterName('postChatAddUser')
  @Post(Chat.postChatAddUser.name)
  async postChatAddUser(
    @Request() req,
    @Body(ValidationPipe) body: ChatAddUserDto,
  ) {
    return await this.chatServer.postAddChatUser(req.user, body);
  }

  @RouterName('getChatAll')
  @Get(Chat.getChatAll.name)
  async getChatAll(@Query(null, ValidationPipe) query: ChatGetFilterDto) {
    return await this.chatServer.getChatAll(query);
  }

  @RouterName('getMyChats')
  @Get(Chat.getMyChats.name)
  async getChats(
    @Request() req,
    @Query(null, ValidationPipe) query: ChatGetFilterDto,
  ) {
    return await this.chatServer.getMyChats(req.user, query);
  }
  @RouterName('getChatsUser')
  @Get(Chat.getChatsUser.name)
  async getChatsUser(@Request() req) {
    return await this.chatServer.getChatsUser(req.user);
  }

  @RouterName('getChatsId')
  @Get(Chat.getChatsId.name)
  async getChatsId(@Request() req, @Param('id') id: string) {
    return await this.chatServer.getMyChatsId(req.user, +id);
  }
}
