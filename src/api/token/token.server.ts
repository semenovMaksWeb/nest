import { Injectable } from '@nestjs/common';
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
  private privateKey = '213sdojg9dsgds';
  async checkToken(id) {
    const token = await this.tokenRepository.findOne(id);
    if (token) {
      return new Date().valueOf() < token.date.valueOf() && token.active;
    }
  }
  async postToken(id: number) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return await this.tokenRepository.save({
      value: jwt.sign(
        new Date().toTimeString() + id.toString(),
        this.privateKey,
      ),
      date: date,
    });
  }
}
