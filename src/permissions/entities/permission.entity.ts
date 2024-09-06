import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { IsString } from 'class-validator';

export class PermissionEnity implements Permission {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  roleId: string;

  @IsString()
  @ApiProperty({
    example: 'user',
  })
  module: string;

  @IsString()
  @ApiProperty({
    example: 'user-create',
  })
  action: string;
}
