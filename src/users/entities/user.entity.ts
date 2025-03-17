import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName: string;

  @Exclude()
  password: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  profileUrl: string;

  @ApiPropertyOptional()
  roleId: string;

  role?: Role;

  @ApiPropertyOptional()
  deletedAt: Date;

  @ApiPropertyOptional()
  emailVerifiedAt: Date;

  @ApiPropertyOptional()
  emailVerificationToken: string;

  @IsBoolean()
  isEmailVerified: boolean;
}
