import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rights } from './rights.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RightsSaveDto } from './rights.dto/rights-save.dto';
import { RightsGetRoles } from './rights.dto/rights-get-roles';

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
  async saveRightsRoles(rights: RightsGetRoles[]): Promise<Rights[]> {
    return await this.rightsRepository.save(rights);
  }
  async updateRights(rightsBody: RightsSaveDto, id: number) {
    const rights = await this.validateBdNull(id);

    await this.validateBdRights(rightsBody.name, rights.id);
    await this.rightsRepository.update(id, {
      name: rightsBody.name,
    });
    return 'Право успешно измененно';
  }

  async getRightsFindName(name: string): Promise<Rights> {
    return await this.rightsRepository.findOne({ where: { name: name } });
  }
  async getRightsFindId(id: number): Promise<Rights> {
    return await this.rightsRepository.findOne(id);
  }
  async getRightsAll(): Promise<Rights[]> {
    return await this.rightsRepository.find();
  }

  private async validateBdRights(name: string, id?: number) {
    const rights = await this.getRightsFindName(name);
    if (rights && rights.id !== id) {
      RightsService.errorsRightsName();
    }
  }
  private async validateBdNull(id: number) {
    const rights = await this.getRightsFindId(id);
    if (!rights) {
      RightsService.errorsRightsNull();
    }
    return rights;
  }
  private static errorsRightsName() {
    throw new HttpException(
      'Указанный название право уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }
  private static errorsRightsNull() {
    throw new HttpException(
      'Право с указанным id не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
