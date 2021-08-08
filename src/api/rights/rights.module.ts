import { Module } from '@nestjs/common';
import { Rights } from './rights.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Rights])],
})
export class RightsModule {}
