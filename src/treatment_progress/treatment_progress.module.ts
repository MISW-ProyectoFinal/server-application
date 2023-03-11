import { Module } from '@nestjs/common';
import { TreatmentProgressService } from './treatment_progress.service';
import { TreatmentProgressController } from './treatment_progress.controller';
import { TreatmentService } from './../treatment/treatment.service';
import { PatientService } from './../patient/patient.service';
import { DoctorService } from './../doctor/doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './../treatment/entities/treatment.entity';
import { TreatmentProgress } from './entities/treatment_progress.entity';
import { Patient } from './../patient/entities/patient.entity';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Case } from './../case/entities/case.entity';
import { AzureBlobService } from './../shared/services/azure-blob.service';
import { TreatmentProgressPhotoService } from './../treatment_progress_photo/treatment_progress_photo.service';
import { TreatmentProgressPhoto } from './../treatment_progress_photo/entities/treatment_progress_photo.entity';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [TreatmentProgressController],
  providers: [
    TreatmentProgressService,
    TreatmentService,
    PatientService,
    DoctorService,
    AzureBlobService,
    TreatmentProgressPhotoService,
    NotificationService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Treatment,
      TreatmentProgress,
      Patient,
      Doctor,
      Case,
      TreatmentProgressPhoto,
    ]),
  ],
})
export class TreatmentProgressModule {}
