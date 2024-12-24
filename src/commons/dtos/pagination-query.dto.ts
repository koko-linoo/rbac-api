import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value && Number(value))
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value && Number(value))
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string;
}
