import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPostDto } from './user.dto/user-post.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getUserAll() {
    return await this.userRepository.find();
  }
  // async getUserId(id: number) {}
  // async getUserToken(token: string) {}
  async postUser(userPostDto: UserPostDto) {
    await this.validateBdUser(userPostDto.nik, userPostDto.email);
    await this.userRepository.save(userPostDto);
  }

  private async validateBdUser(nik?: string, email?: string) {
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
  private static errorsEmail() {
    throw new HttpException('Указанный емайл занят', HttpStatus.BAD_REQUEST);
  }
  private static errorsEmailAndNik() {
    throw new HttpException(
      'Указанный емайл и ник заняты',
      HttpStatus.BAD_REQUEST,
    );
  }
  private static errorsNik() {
    throw new HttpException('Указанный ник занят', HttpStatus.BAD_REQUEST);
  }
}
