import { Module } from '@nestjs/common';
import { PatientIllnessService } from './patient_illness.service';
import { PatientIllnessController } from './patient_illness.controller';
import { Illness } from 'src/illness/entities/illness.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';

@Module({
  controllers: [PatientIllnessController],
  providers: [PatientIllnessService],
  imports: [TypeOrmModule.forFeature([Patient, Illness])],
})
export class PatientIllnessModule {}
