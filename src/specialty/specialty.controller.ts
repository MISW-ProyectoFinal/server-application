import { Controller, Get, Post, Body } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  async findAll() {
    return this.specialtyService.findAll();
  }
}
