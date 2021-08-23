import { Module } from '@nestjs/common';
import { ScriptService } from './script.server';
import { ScriptController } from './script.controller';
import { VariableModule } from '../variable/variable.module';
import { RouterModule } from '../router/router.module';

@Module({
  imports: [VariableModule, RouterModule],
  controllers: [ScriptController],
  providers: [ScriptService],
  exports: [ScriptService],
})
export class ScriptModule {}
