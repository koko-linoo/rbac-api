import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/commons/dtos/pagination-response.dto';
import { UserEntity } from '../entities/user.entity';

export class UserPaginatedResponseDto extends PaginationResponseDto<UserEntity> {
  @ApiProperty({
    type: [UserEntity],
  })
  data: UserEntity[];
}
