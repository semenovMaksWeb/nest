import { Controller, Get } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScriptService } from './script.server';

@Controller('script')
@ApiTags('script')
@ApiBearerAuth()
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}
  @Get('/bd_start')
  async bdDataSet() {
    return await this.scriptService.DataSetBd();
  }
  @Get('/bd_api')
  async bdApiSet() {
    return await this.scriptService.DataSetApi();
  }

  @Get('/bd_style')
  async bdStyleSet() {
    return await this.scriptService.DataSetStyle();
  }
}
