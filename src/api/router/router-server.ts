import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Router } from './router.entity';
import { RouterSave } from './router.class/router-save';

@Injectable()
export class RouterServer {
  constructor(
    @InjectRepository(Router)
    private userRepository: Repository<Router>,
  ) {}

  async getAllRouter() {
    return await this.userRepository.find();
  }
  async savesRouter(router: RouterSave[]) {
    return await this.userRepository.save(router);
  }
}
