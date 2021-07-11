import { Module } from '@nestjs/common';
import { User } from './user.entity';
// import { UserService } from './user.server';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  // providers: [UserService],
})
export class UserModule {}
