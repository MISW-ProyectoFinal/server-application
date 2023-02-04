import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Language } from '../language/language.enum';
import { Sex } from '../sex/sex.enum';
import { Specialty } from '../specialty/entities/specialty.entity';
import { Repository } from 'typeorm';
import { DoctorSpecialtyService } from './doctor_specialty.service';
import { DoctorSpecialty } from './entities/doctor_specialty.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('DoctorSpecialtyService', () => {
  let service: DoctorSpecialtyService;

  let doctorRepository: Repository<Doctor>;
  let doctor: Doctor;

  let specialtyRepository: Repository<Specialty>;
  let specialty: Specialty;

  let repository: Repository<DoctorSpecialty>;

  const today = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [DoctorSpecialtyService],
    }).compile();

    service = module.get<DoctorSpecialtyService>(DoctorSpecialtyService);
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    specialtyRepository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
    repository = module.get<Repository<DoctorSpecialty>>(
      getRepositoryToken(DoctorSpecialty),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    await doctorRepository.delete({});
    await specialtyRepository.delete({});

    doctor = {
      id: faker.datatype.uuid(),
      email: 'miguelcamargo9@gmail.com',
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
      sex: Sex.BINARIO,
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

    specialty = {
      id: faker.datatype.uuid(),
      name: faker.name.jobArea(),
      specifications: [],
      doctor_specialties: [],
    };

    await doctorRepository.save(doctor);
    await specialtyRepository.save(specialty);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create specialty of doctor', async () => {
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 2);

    const specialtyDoctorCreate: DoctorSpecialty = {
      id: faker.datatype.uuid(),
      emission_date: yesterday.toISOString(),
      expiration_date: '2033-02-03',
      authorized: false,
      file_name: faker.image.imageUrl(),
      registry_number: '255544414225',
      specialty: specialty,
      doctor: doctor,
    };
    const specialtyDoctor: DoctorSpecialty = await service.create(
      specialtyDoctorCreate,
    );
    expect(specialtyDoctor).not.toBeNull();
  });

  it('should be not create specialty of doctor for emission_date', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2);

    const specialtyDoctorCreate: DoctorSpecialty = {
      id: faker.datatype.uuid(),
      emission_date: tomorrow.toISOString(),
      expiration_date: '2033-02-03',
      authorized: false,
      file_name: faker.image.imageUrl(),
      registry_number: '255544414225',
      specialty: specialty,
      doctor: doctor,
    };
    console.log(specialtyDoctorCreate);

    await expect(service.create(specialtyDoctorCreate)).rejects;
  });
});
