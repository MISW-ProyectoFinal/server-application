import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecificationIllnessService } from './specification_illness.service';
import { CreateSpecificationIllnessDto } from './dto/create-specification_illness.dto';
import { UpdateSpecificationIllnessDto } from './dto/update-specification_illness.dto';

@Controller('specification-illness')
export class SpecificationIllnessController {
  constructor(private readonly specificationIllnessService: SpecificationIllnessService) {}

  @Post()
  create(@Body() createSpecificationIllnessDto: CreateSpecificationIllnessDto) {
    return this.specificationIllnessService.create(createSpecificationIllnessDto);
  }

  @Get()
  findAll() {
    return this.specificationIllnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificationIllnessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecificationIllnessDto: UpdateSpecificationIllnessDto) {
    return this.specificationIllnessService.update(+id, updateSpecificationIllnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationIllnessService.remove(+id);
  }
}
