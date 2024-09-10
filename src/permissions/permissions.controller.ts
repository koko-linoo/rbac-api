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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEnity } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Permission(['Permission', 'Permission-create'])
  @ApiOkResponse({ status: 200, type: PermissionEnity })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @Permission(['Permission', 'Permission-list'])
  @ApiOkResponse({ status: 200, type: [PermissionEnity] })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Permission(['Permission', 'Permission-detail'])
  @ApiOkResponse({ status: 200, type: PermissionEnity })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @Permission(['Permission', 'Permission-update'])
  @ApiOkResponse({ status: 200, type: PermissionEnity })
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
