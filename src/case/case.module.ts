import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { Patient } from './../patient/entities/patient.entity';
import { Doctor } from './../doctor/entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
import { Injury } from './../injury/entities/injury.entity';
import { DoctorService } from './../doctor/doctor.service';
import { PatientService } from './../patient/patient.service';
import { InjuryService } from './../injury/injury.service';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { Treatment } from './../treatment/entities/treatment.entity';
import { TreatmentService } from './../treatment/treatment.service';

@Module({
  controllers: [CaseController],
  providers: [
    PatientService,
    DoctorService,
    InjuryService,
    CaseService,
    AzureBlobService,
    TreatmentService,
  ],
  imports: [
    TypeOrmModule.forFeature([Patient, Doctor, Injury, Case, Treatment]),
  ],
})
export class CaseModule {}
