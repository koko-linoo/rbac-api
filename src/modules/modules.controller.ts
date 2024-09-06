import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleEntity } from './entities/module.entity';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @ApiOkResponse({ status: 200, type: ModuleEntity })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @ApiOkResponse({ status: 200, type: [ModuleEntity] })
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
