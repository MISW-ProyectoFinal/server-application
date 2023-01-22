import { Module } from '@nestjs/common';
import { PatientAllergyService } from './patient_allergy.service';
import { PatientAllergyController } from './patient_allergy.controller';

@Module({
  controllers: [PatientAllergyController],
  providers: [PatientAllergyService],
})
export class PatientAllergyModule {}
