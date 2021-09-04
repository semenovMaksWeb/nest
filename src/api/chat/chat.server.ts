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
  // Создание нового чата
  async postChat(user: User, body: ChatPostDto) {
    await this.validatePostChat(body.name);
    const saveChat = await this.chatRepository.save({
      ...body,
      user: { id: user.id },
      userId: [{ id: user.id }],
    });
    return {
      id: saveChat.id,
      name: saveChat.name,
    };
  }
  // Добавление нового пользователя в чат
  async postAddChatUser(userMy: User, body: ChatAddUserDto) {
    const chat = await this.findOneIdChat(body.chatId);
    this.validatePostAddChatUser(chat, userMy);
    await this.validateAddUser(body.userId, chat);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('chat_user')
      .values({ userId: body.userId, chatId: body.chatId })

      .execute();

    return 'Пользователь удачно добавлен в чат';
  }
  // Показать все чаты
  async getChatAll(param: ChatGetFilterDto) {
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.chatRepository.find({
      // chat_user check
      relations: ['user', 'userId'],
      take: take,
      skip: skip,
    });
  }
  // Показать все чаты где я админ
  async getMyChats(user: User, param: ChatGetFilterDto) {
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.chatRepository.find({
      where: { user: user.id },
      relations: ['user'],
      take: take,
      skip: skip,
    });
  }
  // чаты где пользователь существует (не работает)
  async getChatsUser(user: User) {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.userId', 'userId', 'userId.id = :id', {
        id: user.id,
      })
      .getMany();
  }

  // Показать чат id где я существую
  async getMyChatsId(user: User, id: number) {
    const chat = await this.chatRepository.findOne({
      relations: ['user', 'userId'],
      where: { id },
    });
    await this.validateUserInChatId(chat, user.id);
    return chat;
  }
  // найти чат по имени
  async findOneNameChat(name: string) {
    return await this.chatRepository.findOne({ where: { name } });
  }
  // найти чат по id
  async findOneIdChat(id: number) {
    return await this.chatRepository.findOne(id, {
      relations: ['user', 'userId'],
    });
  }
  // Валидация при создании чата
  async validatePostChat(name: string) {
    const chat = await this.findOneNameChat(name);
    this.validateChatName(chat);
  }
  // Валидация при добавление в чата пользователя
  validatePostAddChatUser(chat: Chat, user: User) {
    if (!chat) {
      this.errors404Chat();
    }
    if (chat.user.id !== user.id) {
      this.errors400AddUserChat();
    }
  }
  // Валидация что добавляемый пользователь существует и его уже нету в чате
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
  // Валидация что пользователь есть в этом чате
  async validateUserInChatId(chat: Chat, id: number) {
    this.validateChatId(chat);
    if (!chat.userId.filter((e) => e.id === id)[0]) {
      this.errors404YouNotChat();
    }
  }
  // Валидация что чат существует
  validateChatId(chat: Chat) {
    if (!chat) {
      this.errors404Chat();
    }
  }
  // Валидация что чат с таким именем не существует
  validateChatName(chat: Chat) {
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
      'Указанный чат не уже существует',
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
