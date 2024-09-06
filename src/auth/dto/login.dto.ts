import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    example: 'user',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'S3cret',
  })
  password: string;
}

export class TokenDto {
  @ApiProperty()
  accessToken: string;
}

export class JwtUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
