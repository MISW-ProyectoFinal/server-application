import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientIllnessService } from './patient_illness.service';
import { CreatePatientIllnessDto } from './dto/create-patient_illness.dto';
import { UpdatePatientIllnessDto } from './dto/update-patient_illness.dto';

@Controller('patient-illness')
export class PatientIllnessController {
  constructor(private readonly patientIllnessService: PatientIllnessService) {}

  @Post()
  create(@Body() createPatientIllnessDto: CreatePatientIllnessDto) {
    //return this.patientIllnessService.create(createPatientIllnessDto);
  }

  @Get()
  findAll() {
    return this.patientIllnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientIllnessService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientIllnessDto: UpdatePatientIllnessDto,
  ) {
    return this.patientIllnessService.update(+id, updatePatientIllnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientIllnessService.remove(+id);
  }
}
