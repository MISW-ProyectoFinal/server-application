import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientAllergyService } from './patient_allergy.service';
import { CreatePatientAllergyDto } from './dto/create-patient_allergy.dto';
import { UpdatePatientAllergyDto } from './dto/update-patient_allergy.dto';

@Controller('patient-allergy')
export class PatientAllergyController {
  constructor(private readonly patientAllergyService: PatientAllergyService) {}

  @Post()
  create(@Body() createPatientAllergyDto: CreatePatientAllergyDto) {
    //return this.patientAllergyService.create(createPatientAllergyDto);
  }

  @Get()
  findAll() {
    return this.patientAllergyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientAllergyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientAllergyDto: UpdatePatientAllergyDto,
  ) {
    return this.patientAllergyService.update(+id, updatePatientAllergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientAllergyService.remove(+id);
  }
}
