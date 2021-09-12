import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const contentData = await this.componentsVarRepository.find({
      where: { components: { id } },
      relations: ['style'],
    });
    if (contentData.length === 0) {
      this.errors404ComponentsVar();
    }
  }

  errors404ComponentsVar() {
    throw new HttpException(
      'по указанному id не существует переменный стилей',
      HttpStatus.BAD_REQUEST,
    );
  }
}
