import { Module } from '@nestjs/common';
import { Rights } from './rights.entity';
import { RightsService } from './rights.server';
import { RightsController } from './rights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Rights])],
  controllers: [RightsController],
  providers: [RightsService],
  exports: [RightsService],
})
export class RightsModule {}
