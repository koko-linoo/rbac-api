import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

export class UpdatePermissionWithRoleIdDto {
  @IsString()
  @ApiProperty()
  roleId: string;

  @IsArray()
  @ApiProperty()
  permissions: UpdatePermissionDto[];
}
