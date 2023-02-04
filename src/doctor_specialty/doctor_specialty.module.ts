import { Module } from '@nestjs/common';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { DoctorSpecialtyController } from './doctor_specialty.controller';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  controllers: [DoctorSpecialtyController],
  providers: [DoctorSpecialtyService,DoctorService],
  imports: [TypeOrmModule.forFeature([DoctorSpecialty,Doctor])],
})
export class DoctorSpecialtyModule {}
