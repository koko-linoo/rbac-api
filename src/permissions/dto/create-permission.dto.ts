import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @ApiProperty({
    example: 'User',
  })
  module: string;

  @IsString()
  @ApiProperty({
    example: 'User-create',
  })
  action: string;

  @IsString()
  @ApiProperty({
    example: '631354f9-33c9-46a0-bee8-43048c9c0570',
  })
  roleId: string;
}
