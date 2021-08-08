import { Module } from '@nestjs/common';
import { Roles } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
})
export class RolesModule {}
