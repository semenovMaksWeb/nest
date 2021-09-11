import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Components } from './components.entity';

@Injectable()
export class ComponentsServer {
  constructor(
    @InjectRepository(Components)
    private componentsRepository: Repository<Components>,
  ) {}
  async findOneId(id: number) {
    return await this.componentsRepository.findOne(id);
  }
}
