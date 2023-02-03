import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { PatientService } from 'src/patient/patient.service';
import constants from '../shared/security/constants';
import * as bcrypt from 'bcrypt';


const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private patientService: PatientService,
    private doctorService: DoctorService,
  ) {}

  async validateDoctor(email: string, password: string): Promise<any> {
    const doctor: Doctor = await this.doctorService.findByEmail(email);

    if (doctor && await bcrypt.compare(password,doctor.password)) {
      const { ...result } = doctor;
      return result;
    }
    return null;
  }

  async validatePatient(email: string, password: string): Promise<any> {
    const patient: Patient = await this.patientService.findByEmail(email);
    if (patient && await bcrypt.compare(password,patient.password)) {
      const { ...result } = patient;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      token: this.jwtService.sign(payload, {
        privateKey: constants.JWT_SECRET,
      }),
    };
  }
}
