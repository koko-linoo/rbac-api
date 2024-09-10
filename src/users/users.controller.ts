import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permission(['User', 'User-create'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  @Permission(['User', 'User-list'])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Permission(['User', 'User-detail'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Permission(['User', 'User-update'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permission(['User', 'User-delete'])
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
