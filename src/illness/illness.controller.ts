import { Controller, Get, Post, Body } from '@nestjs/common';
import { IllnessService } from './illness.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
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
}
