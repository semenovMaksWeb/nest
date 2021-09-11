import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentsContent } from './components-content.entity';

@Injectable()
export class ComponentsContentServer {
  constructor(
    @InjectRepository(ComponentsContent)
    private componentsContentRepository: Repository<ComponentsContent>,
  ) {}
  async findIdComponents(id: number) {
    console.log(id);
    return await this.componentsContentRepository.find({
      where: { components: { id } },
    });
  }
}
