import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { getConnection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { ChatPostDto } from './chat.dto/chat-post.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ChatAddUserDto } from './chat.dto/chat-add-user.dto';
import { UserService } from '../user/user.server';
import { Pagination } from '../../lib/api/pagination';
import { ChatGetFilterDto } from './chat.dto/chat-get-filter.dto';

export class ChatServer {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private readonly userServer: UserService,
  ) {}
  async postChat(user: User, body: ChatPostDto) {
    await this.validatePostChat(body.name);
    const saveChat = await this.chatRepository.save({
      ...body,
      user: { id: user.id },
    });
    return {
      id: saveChat.id,
      name: saveChat.name,
    };
  }

  async addChatUser(userMy: User, body: ChatAddUserDto) {
    const chat = await this.findOneIdChat(body.chatId);
    this.validateAddChatUser(chat, userMy);
    await this.validateAddUser(body.userId, chat);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('chat_user')
      .values({ userId: body.userId, chatId: body.chatId })

      .execute();

    return 'Пользователь удачно добавлен в чат';
  }

  async getChatAll(param: ChatGetFilterDto) {
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.chatRepository.find({
      // chat_user check
      relations: ['user', 'userId'],
      take: take,
      skip: skip,
    });
  }

  async getMyChats(user: User, param: ChatGetFilterDto) {
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.chatRepository.find({
      where: { user: user.id },
      relations: ['user'],
      take: take,
      skip: skip,
    });
  }
  async getMyChatsId(user: User, id: number) {
    const chat = await this.chatRepository.findOne({
      where: { id: id },
      relations: ['user', 'userId'],
    });
    await this.validateUserInChatId(chat, user.id);
    return chat;
  }

  async findOneNameChat(name: string) {
    return await this.chatRepository.findOne({ where: { name } });
  }

  async findOneIdChat(id: number) {
    return await this.chatRepository.findOne(id, {
      relations: ['user', 'userId'],
    });
  }

  async validatePostChat(name: string) {
    const chat = await this.findOneNameChat(name);
    this.validateChatId(chat);
  }
  validateAddChatUser(chat: Chat, user: User) {
    if (!chat) {
      this.errors404Chat();
    }
    if (chat.user.id !== user.id) {
      this.errors400AddUserChat();
    }
  }
  async validateAddUser(id: number, chat: Chat) {
    const user = await this.userServer.findOneUserId(id);
    if (!user) {
      this.errors404AddUser();
    }
    chat.userId.map((e) => {
      if (e.id === user.id) {
        this.errors400UserChat();
      }
    });
  }

  async validateUserInChatId(chat: Chat, id: number) {
    this.validateChatId(chat);
    if (!chat.userId.filter((e) => e.id === id)[0]) {
      this.errors404YouNotChat();
    }
  }

  validateChatId(chat: Chat) {
    if (chat) {
      this.errors400UniqueNameChat();
    }
  }

  errors400UniqueNameChat() {
    throw new HttpException(
      'Указанный название чата уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }

  errors404Chat() {
    throw new HttpException(
      'Указанный   чат не уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }
  errors404AddUser() {
    throw new HttpException(
      'Указанного пользователя не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
  errors404YouNotChat() {
    throw new HttpException(
      'У вас нету доступа к этому чату',
      HttpStatus.BAD_REQUEST,
    );
  }

  errors400AddUserChat() {
    throw new HttpException(
      'У вас нет прав добавлять пользователей в этом чате',
      HttpStatus.BAD_REQUEST,
    );
  }
  errors400UserChat() {
    throw new HttpException(
      'Указанный пользователь уже в чате',
      HttpStatus.BAD_REQUEST,
    );
  }
}
