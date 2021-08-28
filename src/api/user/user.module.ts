import { Global, Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { TokenModule } from '../token/token.module';
import { RouterModule } from '../router/router.module';
import { VariableModule } from '../variable/variable.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule,
    RouterModule,
    VariableModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, VariableModule, RouterModule],
})
export class UserModule {}
