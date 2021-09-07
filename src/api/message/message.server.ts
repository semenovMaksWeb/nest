import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { ChatServer } from '../chat/chat.server';
import { User } from '../user/user.entity';
import { MessageGetFilterDto } from './message.dto/message-get-filter.dto';
import { Pagination } from '../../lib/api/pagination';
import { MessagePost } from './message.dto/message-post';

export class MessageServer {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly chatServer: ChatServer,
  ) {}
  async getMessage(user: User, query: MessageGetFilterDto, idChat: number) {
    // Валидация чата
    const { skip, take } = Pagination(query?.limit, query?.page);
    await this.chatServer.getMyChatsId(user, idChat);
    return await this.messageRepository.find({
      where: { chat: { id: idChat } },
      relations: ['user'],
      take: take,
      skip: skip,
    });
  }
  async postMessage(user: User, idChat: number, body: MessagePost) {
    await this.chatServer.getMyChatsId(user, idChat);
    return await this.messageRepository.save({
      ...body,
      chat: { id: idChat },
      user: { id: user.id, nik: user.nik },
    });
  }
}
