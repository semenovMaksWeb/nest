import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Router } from './router.entity';
import { RouterSave } from './router.class/router-save';
import { Pagination } from '../../lib/api/pagination';
import { RouterFilterDto } from './router.dto/router-filter.dto';

@Injectable()
export class RouterServer {
  constructor(
    @InjectRepository(Router)
    private userRepository: Repository<Router>,
  ) {}

  async getAllRouter(routerFilterDto: RouterFilterDto): Promise<Router[]> {
    const { skip, take } = Pagination(
      routerFilterDto?.limit,
      routerFilterDto?.page,
    );
    return await this.userRepository.find({
      take: take,
      skip: skip,
      relations: ['rights'],
    });
  }
  async getKeyRouter(key: string): Promise<Router> {
    return await this.userRepository.findOne({ where: { key } });
  }
  async getKeyRouterRights(key: string): Promise<Router> {
    return await this.userRepository.findOne({
      where: { key },
      relations: ['rights'],
    });
  }
  async savesRouter(router: RouterSave[]) {
    return await this.userRepository.save(router);
  }
}
