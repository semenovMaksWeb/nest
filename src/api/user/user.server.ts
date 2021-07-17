import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserPostDto } from './user.dto/user-post.dto';
import { UserAuthorizationDto } from './user.dto/user-authorization.dto';
import { TokenService } from '../token/token.server';
import { Token } from '../token/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}
  // Показать всех пользователей
  async getUserAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  // Авторизация
  async postUserToken(userAuthorizationDto: UserAuthorizationDto) {
    const user = await this.findUserLogin(userAuthorizationDto);
    if (
      user &&
      (await UserService.getPassword(
        userAuthorizationDto.password,
        user.password,
      ))
    ) {
      // пользователь существует и пароль истенный
      const token = await this.tokenService.postToken(user.id);
      await this.postUserTokenManyToMany(user.id, token.id);
      return UserService.getUserProfile(user, token);
    } else {
      // не валдидные данные
      UserService.errorsEmailOrPassword();
    }
  }
  // async getUserId(id: number) {}
  // показать пользователя по token
  async getUserToken(token?: string) {
    token = token.replace('Bearer ', '');
    if (token) {
      return await this.userRepository
        .createQueryBuilder('user')
        .innerJoin('user.token', 'token')
        .where('token.value = :token', { token })
        .getMany();
    }
    return 'Token не указан';
  }
  // Регистрация
  async postUser(userPostDto: UserPostDto) {
    await this.validateBdUser(userPostDto.nik, userPostDto.email);
    await this.userRepository.save({
      nik: userPostDto.nik,
      email: userPostDto.email,
      password: await UserService.createPassword(userPostDto.password),
    });
    return 'Пользователь успешно создан';
  }

  // сохранить связь User and token many to many
  private async postUserTokenManyToMany(idUser: number, idToken: number) {
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('user_token_token')
      .values({
        userId: idUser,
        tokenId: idToken,
      })
      .execute();
  }

  // find login and password
  private async findUserLogin(
    userAuthorizationDto: UserAuthorizationDto,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: userAuthorizationDto.email,
      },
    });
  }

  // validate set and update user
  private async validateBdUser(nik?: string, email?: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [{ nik: nik }, { email: email }],
    });
    //errors null
    if (!user) {
      return;
    }
    //errorsEmailAndNik
    if (user.email === email && user.nik === nik) {
      UserService.errorsEmailAndNik();
    }
    // Errors email
    if (user.email === email) {
      UserService.errorsEmail();
    }
    // Errors nik
    if (user.nik === nik) {
      UserService.errorsNik();
    }
  }

  // get data user profile
  private static getUserProfile(user: User, token: Token) {
    return {
      email: user.email,
      nik: user.nik,
      token: token.value,
    };
  }

  // Ошибка email
  private static errorsEmail(): void {
    throw new HttpException('Указанный емайл занят', HttpStatus.BAD_REQUEST);
  }
  // Ошибка email and nik
  private static errorsEmailAndNik(): void {
    throw new HttpException(
      'Указанный емайл и ник заняты',
      HttpStatus.BAD_REQUEST,
    );
  }
  // Ошибка  nik
  private static errorsNik(): void {
    throw new HttpException('Указанный ник занят', HttpStatus.BAD_REQUEST);
  }
  // Ошибка  email or password
  private static errorsEmailOrPassword(): void {
    throw new HttpException(
      'Указанный email или пароль не верны',
      HttpStatus.BAD_REQUEST,
    );
  }

  // password create
  private static async createPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private static async getPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
