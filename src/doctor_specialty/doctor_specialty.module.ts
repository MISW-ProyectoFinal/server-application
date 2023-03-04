import { Module } from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { DoctorSpecialtyController } from './doctor_specialty.controller';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { AzureBlobService } from 'src/shared/services/azure-blob.service';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationToken } from 'src/notification/entities/notification-token.entity';

@Module({
  controllers: [DoctorSpecialtyController],
  providers: [
    DoctorSpecialtyService,
    DoctorService,
    AzureBlobService,
    NotificationService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      DoctorSpecialty,
      Doctor,
      Notification,
      NotificationToken,
    ]),
  ],
})
export class DoctorSpecialtyModule {}
