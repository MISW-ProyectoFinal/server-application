import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SymptomIllnessService } from './symptom_illness.service';
import { CreateSymptomIllnessDto } from './dto/create-symptom_illness.dto';
import { UpdateSymptomIllnessDto } from './dto/update-symptom_illness.dto';

@Controller('symptom-illness')
export class SymptomIllnessController {
  constructor(private readonly symptomIllnessService: SymptomIllnessService) {}

  @Post()
  create(@Body() createSymptomIllnessDto: CreateSymptomIllnessDto) {
    return this.symptomIllnessService.create(createSymptomIllnessDto);
  }

  @Get()
  findAll() {
    return this.symptomIllnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.symptomIllnessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSymptomIllnessDto: UpdateSymptomIllnessDto) {
    return this.symptomIllnessService.update(+id, updateSymptomIllnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.symptomIllnessService.remove(+id);
  }
}
