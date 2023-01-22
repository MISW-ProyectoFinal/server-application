import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllergyIllnessService } from './allergy_illness.service';
import { CreateAllergyIllnessDto } from './dto/create-allergy_illness.dto';
import { UpdateAllergyIllnessDto } from './dto/update-allergy_illness.dto';

@Controller('allergy-illness')
export class AllergyIllnessController {
  constructor(private readonly allergyIllnessService: AllergyIllnessService) {}

  @Post()
  create(@Body() createAllergyIllnessDto: CreateAllergyIllnessDto) {
    return this.allergyIllnessService.create(createAllergyIllnessDto);
  }

  @Get()
  findAll() {
    return this.allergyIllnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allergyIllnessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllergyIllnessDto: UpdateAllergyIllnessDto) {
    return this.allergyIllnessService.update(+id, updateAllergyIllnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allergyIllnessService.remove(+id);
  }
}
