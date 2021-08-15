import { RolesSaveDto } from './roles-save.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RightsGetRoles } from '../../rights/rights.dto/rights-get-roles';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class RolesSaveRightsDto extends RolesSaveDto {
  @ApiProperty({ type: [RightsGetRoles] })
  @Type(() => RightsGetRoles)
  @IsArray({ message: 'права для ролей являются массивом' })
  @ValidateNested({ message: 'Не валидный массив прав для ролей' })
  rights: RightsGetRoles[];
}
