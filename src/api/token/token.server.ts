import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}
  // Проверить токен на валидность
  checkToken(token: Token) {
    if (token) {
      return new Date().valueOf() < token.date.valueOf() && token.active;
    }
  }
  validateToken(token: Token) {
    if (!token.active) {
      this.tokenNoActive();
    }
    if (!this.checkToken(token)) {
      this.tokenNoDate();
    }
  }

  // создать токен
  async postToken(id: number): Promise<Token> {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return await this.tokenRepository.save({
      value: jwt.sign(
        new Date().toTimeString() + id.toString(),
        process.env.JWT_PRIVATE_KEY,
      ),
      date: date,
    });
  }
  tokenNoValidate(): void {
    throw new HttpException('Токен не валиден', HttpStatus.FORBIDDEN);
  }
  tokenNoActive(): void {
    throw new HttpException('Токен не активный', HttpStatus.FORBIDDEN);
  }
  tokenNoDate(): void {
    throw new HttpException(
      'Время жизни токена закончилось',
      HttpStatus.FORBIDDEN,
    );
  }
}
