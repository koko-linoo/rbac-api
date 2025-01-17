import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'admin@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'admin',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'Admin User',
  })
  fullName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '631354f9-33c9-46a0-bee8-43048c9c0570',
  })
  roleId: string;

  @IsString()
  @ApiProperty({
    example: 'password',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  profileUrl: string;
}
