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
    example: '4d0a33c3-e4c9-4714-b2ef-eeb5c904af85',
  })
  roleId: string;
}
