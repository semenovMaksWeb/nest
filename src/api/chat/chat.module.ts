import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatServer } from './chat.server';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatServer],
  exports: [ChatServer],
})
export class ChatModule {}
