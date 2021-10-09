import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RightsService } from './rights.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RightsSaveDto } from './rights.dto/rights-save.dto';
import { Rights, nameController } from 'src/lib/name/nameApi/Rights';
import { UserGuard } from '../user/user.guard';
import { RouterName } from '../../lib/decorator/router-name.decorator';
import { ParamsIdDto } from '../../lib/dto/paramsId.dto';
@Controller(nameController)
@ApiTags(nameController)
@ApiBearerAuth()
@UseGuards(UserGuard)
export class RightsController {
  constructor(private readonly rightsService: RightsService) {}
  @Get(Rights.rightsAll.name)
  @RouterName('rightsAll')
  async rightsAll() {
    return await this.rightsService.getRightsAll();
  }

  @Post(Rights.rightsSave.name)
  @RouterName('rightsSave')
  async rightsSave(@Body(ValidationPipe) rightsSaveDto: RightsSaveDto) {
    return await this.rightsService.saveRights(rightsSaveDto);
  }

  @Put(Rights.rightsUpdate.name)
  @RouterName('rightsUpdate')
  async rightsUpdate(
    @Body(ValidationPipe) rightsSaveDto: RightsSaveDto,
    @Param('id') params: ParamsIdDto,
  ) {
    return await this.rightsService.updateRights(rightsSaveDto, +params.id);
  }
}
