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
import { Rights, nameController } from 'src/lib/name/nameApi/Rights';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
export class RightsController {
  constructor(private readonly rightsService: RightsService) {}
  @Get(Rights.rightsAll.name)
  async rightsAll() {
    return await this.rightsService.getRightsAll();
  }
  @Post(Rights.rightsSave.name)
  async rightsSave(@Body(ValidationPipe) rightsSaveDto: RightsSaveDto) {
    return await this.rightsService.saveRights(rightsSaveDto);
  }
  @Put(Rights.rightsUpdate.name)
  async rightsUpdate(
    @Body(ValidationPipe) rightsSaveDto: RightsSaveDto,
    @Param('id') id: string,
  ) {
    return await this.rightsService.updateRights(rightsSaveDto, +id);
  }
}
