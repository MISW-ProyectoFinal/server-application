import { Module } from '@nestjs/common';
import { AutomaticCaseService } from './automatic_case.service';
import { AutomaticCaseController } from './automatic_case.controller';
import { PatientService } from './../patient/patient.service';
import { InjuryService } from './../injury/injury.service';
import { Patient } from './../patient/entities/patient.entity';
import { Injury } from './../injury/entities/injury.entity';
import { AutomaticCase } from './entities/automatic_case.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './../doctor/entities/doctor.entity';

@Module({
  controllers: [AutomaticCaseController],
  providers: [PatientService, InjuryService, AutomaticCaseService],
  imports: [TypeOrmModule.forFeature([Patient, Injury, AutomaticCase, Doctor])],
})
export class AutomaticCaseModule {}
