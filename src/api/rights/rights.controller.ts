import { Controller, Get } from '@nestjs/common';
import { RightsService } from './rights.server';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('rights')
@ApiTags('rights')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly rightsService: RightsService) {}
  @Get('/all')
  async rightsServiceAll() {
    return await this.rightsService.getRightsAll();
  }
}
