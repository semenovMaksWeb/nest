import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserPostDto } from './user.dto/user-post.dto';
import { UserAuthorizationDto } from './user.dto/user-authorization.dto';
import { TokenService } from '../token/token.server';
import { Token } from '../token/token.entity';
import { UserUpdateDto } from './user.dto/user-update.dto';
import { Pagination } from '../../lib/api/pagination';
import { UserGetFilterDto } from './user.dto/user-get-filter.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  // Показать всех пользователей
  async getUserAll(param: UserGetFilterDto): Promise<User[]> {
    const { skip, take } = Pagination(param?.limit, param?.page);
    return await this.userRepository.find({
      take: take,
      skip: skip,
    });
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
      return this.getUserProfileAuthorization(user, token);
    } else {
      // не валидные данные
      UserService.errorsEmailOrPassword();
    }
  }

  // Регистрация обычного пользователя
  async postUser(userPostDto: UserPostDto) {
    await this.validateBdUser(userPostDto.nik, userPostDto.email);
    await this.userRepository.save({
      nik: userPostDto.nik,
      email: userPostDto.email,
      password: await UserService.createPassword(userPostDto.password),
      roles: [
        {
          id: 1,
        },
      ],
    });
    return 'Пользователь успешно создан';
  }

  // изменения пользователя
  async updateUserProfile(id: number, userUpdateDto: UserUpdateDto) {
    await this.validateBdUser(userUpdateDto.nik, null, id);
    await this.userRepository.update(id, {
      nik: userUpdateDto.nik,
    });
    return 'изменения успешны';
  }

  // сохранить связь User and token many to many
  private async postUserTokenManyToMany(idUser: number, idToken: number) {
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('user_token')
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

  // найти пользователя по токену
  async findUserToken(token?: string, checkValidate = 'rest') {
    token = token.replace('Bearer ', '');
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.token', 'token')
      .where('token.value = :token', { token })
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.rights', 'rights')
      .getOne();
    if (data) {
      await this.tokenService.validateToken(data.token[0], checkValidate);
      return data;
    } else {
      this.tokenService.tokenNoValidate(checkValidate);
    }
  }

  // validate set and update user
  private async validateBdUser(
    nik?: string,
    email?: string,
    id?: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [{ nik: nik }, { email: email }],
    });
    //errors null
    if (!user) {
      return;
    }
    //errorsEmailAndNik
    if (user.email === email && user.nik === nik && user.id !== id) {
      UserService.errorsEmailAndNik();
    }
    // Errors email
    if (user.email === email && user.id !== id) {
      UserService.errorsEmail();
    }
    // Errors nik
    if (user.nik === nik && user.id !== id) {
      UserService.errorsNik();
    }
  }

  // get data user profile and token
  getUserProfile(user: User) {
    return {
      email: user.email,
      nik: user.nik,
    };
  }

  // get data user profile and token
  private getUserProfileAuthorization(user: User, token: Token) {
    const userProfile = this.getUserProfile(user);
    return {
      ...userProfile,
      token: token.value,
    };
  }
  async findOneUserId(id: number) {
    return await this.userRepository.findOne(id);
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
  static async createPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async getPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
