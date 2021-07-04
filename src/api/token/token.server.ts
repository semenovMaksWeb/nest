import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('tokenRepository')
    private tokenRepository: Repository<Token>,
  ) {}
}
