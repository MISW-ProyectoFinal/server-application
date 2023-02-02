import { Module } from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { DoctorSpecialtyController } from './doctor_specialty.controller';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DoctorSpecialtyController],
  providers: [DoctorSpecialtyService],
  imports: [TypeOrmModule.forFeature([DoctorSpecialty])],

})
export class DoctorSpecialtyModule {}
