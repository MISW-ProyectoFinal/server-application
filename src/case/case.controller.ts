import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Injury } from './../injury/entities/injury.entity';
import { InjuryService } from './../injury/injury.service';
import { Patient } from './../patient/entities/patient.entity';
import { PatientService } from './../patient/patient.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case } from './entities/case.entity';
import { Doctor } from './../doctor/entities/doctor.entity';
import { DoctorService } from './../doctor/doctor.service';

@Controller('case')
export class CaseController {
  constructor(
    private readonly caseService: CaseService,
    private readonly injuryService: InjuryService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':injuryId')
  async create(
    @Req() req: any,
    @Param('injuryId') injuryId: string,
    @Body() createCaseDto: CreateCaseDto,
  ) {
    const { id } = req.user;
    const patient: Patient = await this.patientService.findOne(id);
    const injury: Injury = await this.injuryService.findOne(injuryId);
    const caseInstance: Case = plainToInstance(Case, createCaseDto);

    return await this.caseService.create(caseInstance, injury, patient);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':statusName')
  async findAll(@Req() req: any, @Param('statusName') statusName: string) {
    const { id } = req.user;
    const doctor: Doctor = await this.doctorService.findOne(id);

    return await this.caseService.findAll(doctor, statusName);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.caseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.caseService.update(+id, updateCaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('asign-case/:id')
  async asignCase(@Req() req: any, @Param('id') id: string) {
    const { doctorId } = req.user;
    const doctor: Doctor = await this.doctorService.findOne(doctorId);

    const updateCaseDto: UpdateCaseDto = { doctor: doctor };
    const caseInstance: Case = plainToInstance(Case, updateCaseDto);
    return await this.caseService.asignCase(id, caseInstance, doctor);
  }
}
