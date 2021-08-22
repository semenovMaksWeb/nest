import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variable } from './variable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VariableServer {
  constructor(
    @InjectRepository(Variable)
    private variableRepository: Repository<Variable>,
  ) {}

  async getValKey(key: string) {
    return await this.variableRepository.findOne({ where: { key } });
  }
  async setValKey(key: string, value: string) {
    const variable = await this.getValKey(key);
    return await this.variableRepository.update(variable.id, { value: value });
  }
  async createKey(key: string, value: string) {
    return await this.variableRepository.save({ key, value });
  }
}
