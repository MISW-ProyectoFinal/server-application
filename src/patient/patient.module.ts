import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [PatientController],
  providers: [PatientService, AuthService, JwtService, DoctorService],
  imports: [TypeOrmModule.forFeature([Patient, Doctor, User])],
})
export class PatientModule {}
