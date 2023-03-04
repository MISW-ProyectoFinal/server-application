import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import constants from '../shared/security/constants';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientModule } from 'src/patient/patient.module';
import { User } from 'src/user/entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationToken } from 'src/notification/entities/notification-token.entity';
import { Notification } from 'src/notification/entities/notification.entity';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    PassportModule,
    JwtModule.register({
      secret: constants.JWT_SECRET,
      signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([
      User,
      Patient,
      Doctor,
      NotificationToken,
      Notification,
    ]),
  ],
  providers: [
    AuthService,
    DoctorService,
    PatientService,
    JwtAuthGuard,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    NotificationService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
