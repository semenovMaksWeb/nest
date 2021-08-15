import { Module } from '@nestjs/common';
import { Roles } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.server';
import { RightsModule } from '../rights/rights.module';
@Module({
  imports: [TypeOrmModule.forFeature([Roles]), RightsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
