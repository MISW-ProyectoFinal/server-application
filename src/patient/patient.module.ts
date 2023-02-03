import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, AuthService, JwtService],
  imports: [TypeOrmModule.forFeature([Patient])],
})
export class PatientModule {}
