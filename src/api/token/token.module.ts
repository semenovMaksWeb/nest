import { Module } from '@nestjs/common';
import { Token } from './token.entity';
// import { TokenService } from './token.server';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [],
  // providers: [TokenService],
})
export class TokenModule {}
