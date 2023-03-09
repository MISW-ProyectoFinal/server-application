import { Module } from '@nestjs/common';
import { InjuryService } from './injury.service';
import { InjuryController } from './injury.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Injury } from './entities/injury.entity';
import { InjuryPhoto } from './../injury_photo/entities/injury_photo.entity';
import { InjuryPhotoService } from './../injury_photo/injury_photo.service';
import { Patient } from './../patient/entities/patient.entity';
import { PatientService } from './../patient/patient.service';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { Case } from './../case/entities/case.entity';
import { CaseService } from './../case/case.service';
import { DoctorService } from './../doctor/doctor.service';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Treatment } from './../treatment/entities/treatment.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [InjuryController],
  providers: [
    PatientService,
    InjuryService,
    InjuryPhotoService,
    CaseService,
    AzureBlobService,
    DoctorService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      Injury,
      InjuryPhoto,
      Case,
      Doctor,
      Treatment,
    ]),
    HttpModule,
  ],
})
export class InjuryModule {}
