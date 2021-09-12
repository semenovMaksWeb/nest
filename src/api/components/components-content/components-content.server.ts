import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentsContent } from './components-content.entity';

@Injectable()
export class ComponentsContentServer {
  constructor(
    @InjectRepository(ComponentsContent)
    private componentsContentRepository: Repository<ComponentsContent>,
  ) {}
  async findContentIdComponents(id: number) {
    const contentData = await this.componentsContentRepository.find({
      where: { components: { id } },
    });
    if (contentData.length === 0) {
      this.errors404ComponentsContent();
    }
  }

  errors404ComponentsContent() {
    throw new HttpException(
      'по указанному id не существует контент даты',
      HttpStatus.BAD_REQUEST,
    );
  }
}
