import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { Treatment } from './entities/treatment.entity';
import { CaseService } from './../case/case.service';
import { PatientService } from './../patient/patient.service';
import { DoctorService } from './../doctor/doctor.service';

@Controller('treatment')
export class TreatmentController {
  constructor(
    private readonly caseService: CaseService,
    private readonly treatmentService: TreatmentService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':caseId')
  async create(
    @Req() req: any,
    @Param('caseId') caseId: string,
    @Body() createTreatmentDto: CreateTreatmentDto,
  ) {
    const doctorId = req.user.id;
    const treatment: Treatment = plainToInstance(Treatment, createTreatmentDto);

    return await this.treatmentService.create(treatment, caseId, doctorId);
  }

  @Get()
  findAll() {
    return this.treatmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.treatmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentService.update(+id, updateTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentService.remove(+id);
  }
}
