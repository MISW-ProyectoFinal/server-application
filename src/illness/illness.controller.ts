import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IllnessService } from './illness.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { Illness } from './entities/illness.entity';
import { plainToInstance } from 'class-transformer';

@Controller('illness')
export class IllnessController {
  constructor(private readonly illnessService: IllnessService) {}

  @Post()
  async create(@Body() createIllnessDto: CreateIllnessDto) {
    const illness: Illness = plainToInstance(Illness, createIllnessDto);
    return this.illnessService.create(illness);
  }

  @Get()
  async findAll() {
    return await this.illnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.illnessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIllnessDto: UpdateIllnessDto) {
    return this.illnessService.update(+id, updateIllnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.illnessService.remove(+id);
  }
}
