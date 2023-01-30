import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [TypeOrmModule.forFeature([Doctor, User])],
})
export class DoctorModule {}
