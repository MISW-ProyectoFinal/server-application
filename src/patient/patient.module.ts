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
import { PatientAllergyService } from 'src/patient_allergy/patient_allergy.service';
import { PatientIllnessService } from 'src/patient_illness/patient_illness.service';
import { Allergy } from 'src/allergy/entities/allergy.entity';
import { Illness } from 'src/illness/entities/illness.entity';
import { AzureBlobService } from 'src/shared/services/azure-blob.service';

@Module({
  controllers: [PatientController],
  providers: [
    PatientService,
    AuthService,
    JwtService,
    DoctorService,
    PatientAllergyService,
    PatientIllnessService,
    AzureBlobService,
  ],
  imports: [
    TypeOrmModule.forFeature([Patient, Doctor, User, Allergy, Illness]),
  ],
})
export class PatientModule {}
