import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StyleTypeModule } from '../style-type/style-type.module';
import { Style } from './style.entity';

@Module({
  imports: [StyleTypeModule, TypeOrmModule.forFeature([Style])],
  controllers: [],
})
export class StyleModule {}
