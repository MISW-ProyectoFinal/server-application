import { Module } from '@nestjs/common';
import { PatientIllnessService } from './patient_illness.service';
import { PatientIllnessController } from './patient_illness.controller';

@Module({
  controllers: [PatientIllnessController],
  providers: [PatientIllnessService],
})
export class PatientIllnessModule {}
