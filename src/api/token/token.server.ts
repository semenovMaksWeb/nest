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
  checkToken(token: Token): boolean {
    return new Date().valueOf() < token.date.valueOf();
  }
  checkUpdateDateToken(token: Token) {
    const date = new Date();
    return (
      date.valueOf() >
      token.date
        .setHours(
          token.date.getHours() -
            parseInt(process.env.CHECK_UPDATE_TOKEN_HOURS),
        )
        .valueOf()
    );
  }
  // обновить дату жизни токену
  async updateDateToken(token: Token) {
    if (this.checkUpdateDateToken(token)) {
      const date = this.generationDateToken();
      console.log('1 часов токен протухнет');
      // если через после 1 часов токен протухнет обновить его
      await this.tokenRepository.update(
        { id: token.id },
        {
          date: date,
        },
      );
    }
  }
  // валидация токена
  async validateToken(token: Token) {
    if (!token.active) {
      // токен не активен
      this.tokenNoActive();
    }
    if (!this.checkToken(token)) {
      // токен время жизни закончилось
      await this.deleteToken(token);
      this.tokenNoDate();
    }
    // токен валиден проверить требуется ли продливать жизнь токену
    await this.updateDateToken(token);
  }

  // создать токен
  async postToken(id: number): Promise<Token> {
    const date = this.generationDateToken();
    return await this.tokenRepository.save({
      value: jwt.sign(
        new Date().toTimeString() + id.toString(),
        process.env.JWT_PRIVATE_KEY,
      ),
      date: date,
    });
  }
  //удалить токен
  async deleteToken(token: Token) {
    await this.tokenRepository.delete(token.id);
  }
  generationDateToken() {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(process.env.LIVE_TOKEN_DAY));
    return date;
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
