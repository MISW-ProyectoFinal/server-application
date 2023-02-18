import { Module } from '@nestjs/common';
import { PatientAllergyService } from './patient_allergy.service';
import { PatientAllergyController } from './patient_allergy.controller';
import { Allergy } from 'src/allergy/entities/allergy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';

@Module({
  controllers: [PatientAllergyController],
  providers: [PatientAllergyService],
  imports: [TypeOrmModule.forFeature([Patient, Allergy])],
})
export class PatientAllergyModule {}
