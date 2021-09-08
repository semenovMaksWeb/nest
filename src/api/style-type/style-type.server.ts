import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StyleType } from './style-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StyleTypeServer {
  constructor(
    @InjectRepository(StyleType)
    private styleTypeRepository: Repository<StyleType>,
  ) {}
  async findStyleTypeAll() {
    return await this.styleTypeRepository.find();
  }
}
