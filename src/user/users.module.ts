import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService,DoctorService,PatientService],
  imports: [TypeOrmModule.forFeature([User,Doctor,Patient])],
})
export class UsersModule {}
