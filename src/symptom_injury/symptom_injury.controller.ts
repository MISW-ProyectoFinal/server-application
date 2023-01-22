import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SymptomInjuryService } from './symptom_injury.service';
import { CreateSymptomInjuryDto } from './dto/create-symptom_injury.dto';
import { UpdateSymptomInjuryDto } from './dto/update-symptom_injury.dto';

@Controller('symptom-injury')
export class SymptomInjuryController {
  constructor(private readonly symptomInjuryService: SymptomInjuryService) {}

  @Post()
  create(@Body() createSymptomInjuryDto: CreateSymptomInjuryDto) {
    return this.symptomInjuryService.create(createSymptomInjuryDto);
  }

  @Get()
  findAll() {
    return this.symptomInjuryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.symptomInjuryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSymptomInjuryDto: UpdateSymptomInjuryDto,
  ) {
    return this.symptomInjuryService.update(+id, updateSymptomInjuryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.symptomInjuryService.remove(+id);
  }
}
