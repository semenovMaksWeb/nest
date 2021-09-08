import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Style } from './style.entity';

@Injectable()
export class StyleServer {
  constructor(
    @InjectRepository(Style)
    private styleRepository: Repository<Style>,
  ) {}
  async findStyleAll() {
    return await this.styleRepository.find();
  }
}
