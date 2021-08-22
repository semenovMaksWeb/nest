import { Module } from '@nestjs/common';
import { ScriptService } from './script.server';
import { ScriptController } from './script.controller';
import { VariableModule } from '../variable/variable.module';

@Module({
  imports: [VariableModule],
  controllers: [ScriptController],
  providers: [ScriptService],
  exports: [ScriptService],
})
export class ScriptModule {}
