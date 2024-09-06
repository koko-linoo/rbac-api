import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'user',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'User',
  })
  fullName: string;

  @IsString()
  @ApiProperty({
    example: 'S3cret',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  profileUrl: string;
}
