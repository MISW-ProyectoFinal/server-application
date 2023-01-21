import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';

@Controller('specification')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @Post()
  create(@Body() createSpecificationDto: CreateSpecificationDto) {
    return this.specificationService.create(createSpecificationDto);
  }

  @Get()
  findAll() {
    return this.specificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecificationDto: UpdateSpecificationDto) {
    return this.specificationService.update(+id, updateSpecificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationService.remove(+id);
  }
}
