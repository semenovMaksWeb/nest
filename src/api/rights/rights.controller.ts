import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { RightsService } from './rights.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RightsSaveDto } from './rights.dto/rights-save.dto';
@Controller('rights')
@ApiTags('rights')
@ApiBearerAuth()
export class RightsController {
  constructor(private readonly rightsService: RightsService) {}
  @Get('/all')
  async rightsAll() {
    return await this.rightsService.getRightsAll();
  }
  @Post('')
  async rightsSave(@Body(ValidationPipe) rightsSaveDto: RightsSaveDto) {
    return await this.rightsService.saveRights(rightsSaveDto);
  }
  @Put(':id')
  async rightsUpdate(
    @Body(ValidationPipe) rightsSaveDto: RightsSaveDto,
    @Param('id') id: string,
  ) {
    return await this.rightsService.updateRights(rightsSaveDto, +id);
  }
}
