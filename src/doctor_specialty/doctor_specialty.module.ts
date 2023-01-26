import { Module } from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { DoctorSpecialtyController } from './doctor_specialty.controller';

@Module({
  controllers: [DoctorSpecialtyController],
  providers: [DoctorSpecialtyService],
})
export class DoctorSpecialtyModule {}
