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
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { TreatmentProgressService } from './../treatment_progress/treatment_progress.service';
import { TreatmentProgress } from './../treatment_progress/entities/treatment_progress.entity';
import { TreatmentProgressPhoto } from './../treatment_progress_photo/entities/treatment_progress_photo.entity';
import { TreatmentProgressPhotoService } from './../treatment_progress_photo/treatment_progress_photo.service';
import { NotificationService } from './../notification/notification.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TreatmentController],
  providers: [
    CaseService,
    TreatmentService,
    PatientService,
    DoctorService,
    AzureBlobService,
    TreatmentProgressService,
    TreatmentProgressPhotoService,
    NotificationService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Case,
      Treatment,
      Patient,
      Doctor,
      TreatmentProgress,
      TreatmentProgressPhoto,
    ]),
    HttpModule,
  ],
})
export class TreatmentModule {}
