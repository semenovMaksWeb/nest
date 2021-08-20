import { Module } from '@nestjs/common';
import { ScriptService } from './script.server';
import { ScriptController } from './script.controller';

@Module({
  imports: [],
  controllers: [ScriptController],
  providers: [ScriptService],
  exports: [ScriptService],
})
export class ScriptModule {}
