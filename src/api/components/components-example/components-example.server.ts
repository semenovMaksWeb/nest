import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentsExample } from './components-example.entity';
import { Repository } from 'typeorm';
import { ComponentsExamplePostDto } from './components-example.dto/components-example-post.dto';
import { ComponentsServer } from '../components/components.server';
import { ComponentsExampleFilter } from './components-example.dto/components-example-filter';
import { Pagination } from '../../../lib/api/pagination';

@Injectable()
export class ComponentsExampleServer {
  constructor(
    @InjectRepository(ComponentsExample)
    private componentsExampleRepository: Repository<ComponentsExample>,
    private componentsServer: ComponentsServer,
  ) {}

  async findOneName(name: string) {
    return await this.componentsExampleRepository.findOne({
      where: [{ name }],
    });
  }
  async getAllComponentsExample(query: ComponentsExampleFilter) {
    const { skip, take } = Pagination(query?.limit, query?.page);
    return await this.componentsExampleRepository.find({
      take: take,
      skip: skip,
    });
  }

  async getIdComponentsExample(id: number) {
    const data = await this.componentsExampleRepository.find({
      where: [{ components: { id } }],
    });
    if (data.length === 0) {
      ComponentsExampleServer.errors404Components();
    }
    return data;
  }
  async postComponentsExample(body: ComponentsExamplePostDto) {
    if (!(await this.componentsServer.findOneId(body.id))) {
      ComponentsExampleServer.errors404Components();
    }
    if (await this.findOneName(body.name)) {
      ComponentsExampleServer.errors400ComponentsName();
    } else {
      return await this.componentsExampleRepository.save({
        name: body.name,
        description: body.description,
        components: { id: body.id },
      });
    }
  }

  private static errors404Components() {
    throw new HttpException(
      'Компонент с указанным id не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
  private static errors400ComponentsName() {
    throw new HttpException(
      'Компонент с указанным name занято',
      HttpStatus.BAD_REQUEST,
    );
  }
}
