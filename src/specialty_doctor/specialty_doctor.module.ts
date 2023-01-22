import { Module } from '@nestjs/common';
import { SpecialtyDoctorService } from './specialty_doctor.service';
import { SpecialtyDoctorController } from './specialty_doctor.controller';

@Module({
  controllers: [SpecialtyDoctorController],
  providers: [SpecialtyDoctorService],
})
export class SpecialtyDoctorModule {}
