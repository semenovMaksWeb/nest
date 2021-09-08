import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StyleTypeModule } from '../style-type/style-type.module';
import { Style } from './style.entity';
import { StyleServer } from './style.server';

@Module({
  imports: [StyleTypeModule, TypeOrmModule.forFeature([Style])],
  controllers: [],
  providers: [StyleServer],
  exports: [StyleTypeModule, StyleServer],
})
export class StyleModule {}
