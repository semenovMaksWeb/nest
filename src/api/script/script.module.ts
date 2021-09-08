import { Module } from '@nestjs/common';
import { ScriptService } from './script.server';
import { ScriptController } from './script.controller';
import { VariableModule } from '../variable/variable.module';
import { RouterModule } from '../router/router.module';
import { StyleModule } from '../style/style.module';

@Module({
  imports: [VariableModule, RouterModule, StyleModule],
  controllers: [ScriptController],
  providers: [ScriptService],
  exports: [ScriptService],
})
export class ScriptModule {}
