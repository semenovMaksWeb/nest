import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rights } from './rights.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RightsSaveDto } from './rights.dto/rights-save.dto';

@Injectable()
export class RightsService {
  constructor(
    @InjectRepository(Rights)
    private rightsRepository: Repository<Rights>,
  ) {}
  async saveRights(rights: RightsSaveDto): Promise<Rights> {
    await this.validateBdRights(rights.name);
    return await this.rightsRepository.save({
      name: rights.name,
    });
  }
  async getRightsFindName(name: string): Promise<Rights> {
    return await this.rightsRepository.findOne({ where: { name: name } });
  }
  async getRightsAll(): Promise<Rights[]> {
    return await this.rightsRepository.find();
  }

  private async validateBdRights(name: string) {
    return await this.getRightsFindName(name);
  }
}
