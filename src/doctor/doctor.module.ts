import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PatientService } from 'src/patient/patient.service';
import { User } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [DoctorController],
  providers: [
    DoctorService,
    AuthService,
    JwtService,
    PatientService,
    NotificationService,
  ],
  imports: [TypeOrmModule.forFeature([Doctor, Patient, User])],
  exports: [DoctorService],
})
export class DoctorModule {}
