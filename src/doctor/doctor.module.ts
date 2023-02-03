import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, AuthService, JwtService],
  imports: [TypeOrmModule.forFeature([Doctor])],
})
export class DoctorModule {}
