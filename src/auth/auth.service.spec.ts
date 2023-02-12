import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './../doctor/doctor.service';
import { PatientService } from './../patient/patient.service';
import { UsersService } from '../user/users.service';
import { AuthService } from './auth.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let doctorService: DoctorService;
  let patientService: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [AuthService, DoctorService, JwtService, PatientService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    doctorService = module.get<DoctorService>(DoctorService);
    patientService = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
