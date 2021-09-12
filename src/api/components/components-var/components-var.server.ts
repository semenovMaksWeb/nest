import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ComponentsVar } from './components-var.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentsVarServer {
  constructor(
    @InjectRepository(ComponentsVar)
    private componentsVarRepository: Repository<ComponentsVar>,
  ) {}
  async findVarIdComponents(id: number) {
    console.log(id);
    return await this.componentsVarRepository.find({
      where: { components: { id } },
      relations: ['style'],
    });
  }
}
