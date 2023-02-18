import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorService } from './doctor.service';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Gender } from '../gender/gender.enum';
import { Country } from '../country/entities/country.entity';
import { City } from '../city/entities/city.entity';
import { DocumentType } from '../document_type/entities/document_type.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Language } from './../language/language.enum';
import { faker } from '@faker-js/faker';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('DoctorService', () => {
  let repository: Repository<Doctor>;
  let service: DoctorService;
  let doctorSeed: Doctor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [DoctorService],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    repository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await repository.delete({});

    doctorSeed = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: 'TEst13$$',
      active: false,
      name: 'Miguel',
      surname: 'Camargo',
      phone: '3125270304',
      cell_phone: '3125270304',
      date_of_birth: '1991-10-03',
      address: 'CArrera 116B # 78B 62',
      city: null,
      country: null,
      gender: Gender.BINARIO,
      document_type: null,
      document_number: '12341234',
      doctor_specialties: [],
      enabled: false,
      enabled_date: '20203-02-01',
      cases: [],
      virt_country: null,
      virt_city: null,
      fav_language: Language.ENGLISH,
    };
    await repository.save(doctorSeed);
  };

  it('Create doctor', async () => {
    const doctorCreate: Doctor = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
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
      gender: Gender.BINARIO,
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
      id: faker.datatype.uuid(),
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
      gender: Gender.BINARIO,
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
      gender: Gender.BINARIO,
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

  it('Should return one doctro by id', async () => {
    const doctor: Doctor = await service.findOne(doctorSeed.id);
    expect(doctor).not.toBeNull();
  });

  it('Should not update doctor', async () => {
    let updateDoctorDto = {
      cell_phone:"+57855454655"
    }
    const doctorData: Doctor = plainToInstance(Doctor, updateDoctorDto);

    try {
      await service.update(faker.datatype.uuid(),doctorData);
    } catch (error) {
      console.log(error);
      expect(error.message).toBe('Doctor no encontrado');
    }
  });

  it('Should not find doctor by email', async () => {
   
    try {
      await service.findByEmail(faker.internet.email());
    } catch (error) {
      expect(error.message).toBe('El doctor que esta buscando no existe');
    }
  });

});
