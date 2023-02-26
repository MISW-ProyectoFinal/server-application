import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { CaseService } from './../case/case.service';
import { PatientService } from './../patient/patient.service';
import { DoctorService } from './../doctor/doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './../case/entities/case.entity';
import { Treatment } from './entities/treatment.entity';
import { Patient } from './../patient/entities/patient.entity';
import { Doctor } from './../doctor/entities/doctor.entity';

@Module({
  controllers: [TreatmentController],
  providers: [CaseService, TreatmentService, PatientService, DoctorService],
  imports: [TypeOrmModule.forFeature([Case, Treatment, Patient, Doctor])],
})
export class TreatmentModule {}
