import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variable } from './variable.entity';
import { VariableServer } from './variable.server';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  controllers: [],
  providers: [VariableServer],
  exports: [VariableServer],
})
export class VariableModule {}
