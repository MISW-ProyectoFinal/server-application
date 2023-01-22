import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecificationAllergyService } from './specification_allergy.service';
import { CreateSpecificationAllergyDto } from './dto/create-specification_allergy.dto';
import { UpdateSpecificationAllergyDto } from './dto/update-specification_allergy.dto';

@Controller('specification-allergy')
export class SpecificationAllergyController {
  constructor(private readonly specificationAllergyService: SpecificationAllergyService) {}

  @Post()
  create(@Body() createSpecificationAllergyDto: CreateSpecificationAllergyDto) {
    return this.specificationAllergyService.create(createSpecificationAllergyDto);
  }

  @Get()
  findAll() {
    return this.specificationAllergyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificationAllergyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecificationAllergyDto: UpdateSpecificationAllergyDto) {
    return this.specificationAllergyService.update(+id, updateSpecificationAllergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationAllergyService.remove(+id);
  }
}
