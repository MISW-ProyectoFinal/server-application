import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from './doctor.service';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Sex } from '../sex/sex.enum';
import { Country } from '../country/entities/country.entity';
import { City } from '../city/entities/city.entity';
import { DocumentType } from '../document_type/entities/document_type.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Language } from './../language/language.enum';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('DoctorService', () => {
  let repository: Repository<Doctor>;
  let service: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [DoctorService],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    repository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create doctor', async () => {
    const doctorCreate: Doctor = {
      id: '64daac79-fd5c-4618-8e94-84206d0411d5',
      email: 'miguelcamargo9@gmail.com',
      password: 'Testing123$',
      active: false,
      name: 'Miguel',
      surname: 'Camargo',
      phone: '3125270304',
      cell_phone: '3125270304',
      date_of_birth: '1991-10-03',
      address: 'CArrera 116B # 78B 62',
      city: null,
      country: null,
      sex: Sex.BINARIO,
      document_type: null,
      document_number: '12341234',
      doctor_specialties: [],
      enabled: false,
      enabled_date: '20203-02-01',
      cases: [],
      virt_country: null,
      virt_city: null,
      fav_language: Language.SPANISH,
    };
    const doctor: Doctor = await service.create(doctorCreate);
    expect(doctor).not.toBeNull();
    expect(doctor.name).toEqual('Miguel');
  });

  it('Validate email', async () => {
    const doctorCreate = {
      email: 'noemail',
      password: 'Testing123$$',
      active: false,
      name: 'Miguel',
      surname: 'Camargo',
      phone: '3125270304',
      cell_phone: '3125270304',
      date_of_birth: '1991-10-03',
      address: 'CArrera 116B # 78B 62',
      city: null,
      country: null,
      sex: Sex.BINARIO,
      document_type: null,
      document_number: '12341234',
      doctor_specialties: [],
      enabled: false,
      enabled_date: '20203-02-01',
      cases: [],
    };
    const doctorC = plainToInstance(CreateDoctorDto, doctorCreate);
    const errors = await validate(doctorC);
    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain('email must be an email');
  });

  it('Validate password', async () => {
    const doctorCreate = {
      email: 'miguelcamargo9@gmail.com',
      password: 'short',
      active: false,
      name: 'Miguel',
      surname: 'Camargo',
      phone: '3125270304',
      cell_phone: '3125270304',
      date_of_birth: '1991-10-03',
      address: 'CArrera 116B # 78B 62',
      city: null,
      country: null,
      sex: Sex.BINARIO,
      document_type: null,
      document_number: '12341234',
      doctor_specialties: [],
      enabled: false,
      enabled_date: '20203-02-01',
      cases: [],
    };
    const doctorC = plainToInstance(CreateDoctorDto, doctorCreate);
    const errors = await validate(doctorC);
    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain('Invalid password');
  });
});
