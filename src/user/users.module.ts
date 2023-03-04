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
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationToken } from 'src/notification/entities/notification-token.entity';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    JwtService,
    DoctorService,
    PatientService,
    NotificationModule,
    NotificationService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Doctor,
      Patient,
      Notification,
      NotificationToken,
    ]),
  ],
})
export class UsersModule {}
