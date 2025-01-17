import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty({
    example: 'Admin',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Admin role is to manage all action',
  })
  description: string;
}
