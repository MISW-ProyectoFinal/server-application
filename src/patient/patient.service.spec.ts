import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ValidationError } from 'class-validator';
import { Gender } from '../gender/gender.enum';
import { SkinType } from './../skin_type/skin_type.enum';
import { Language } from './../language/language.enum';
import { faker } from '@faker-js/faker';
import { Country } from './../country/entities/country.entity';
import { City } from './../city/entities/city.entity';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('PatientService', () => {
  let repository: Repository<Patient>;
  let countryRepository: Repository<Country>;
  let cityRepository: Repository<City>;
  let service: PatientService;
  let country: Country;
  let city: City;
  let country1: Country;
  let city1: City;
  let initialPatient: Patient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
    countryRepository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    await cityRepository.delete({});
    await countryRepository.delete({});

    country = {
      id: faker.datatype.uuid(),
      name: 'Canada',
      users: [],
      cities: [],
      document_types: [],
      virt_users: [],
    };

    country1 = {
      id: faker.datatype.uuid(),
      name: 'Colombia',
      users: [],
      cities: [],
      document_types: [],
      virt_users: [],
    };

    city = {
      id: faker.datatype.uuid(),
      name: 'Vancouver',
      country: country,
      users: [],
      virt_users: [],
    };

    city1 = {
      id: faker.datatype.uuid(),
      name: 'Bogotá',
      country: country1,
      users: [],
      virt_users: [],
    };

    initialPatient = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: 'Testing123$',
      active: true,
      name: 'Pedro',
      surname: 'Linares',
      phone: '12331233',
      cell_phone: '3125270304',
      date_of_birth: '1991-10-03',
      address: 'Ugarte 116B # 78B 62',
      city: null,
      country: null,
      gender: Gender.BINARIO,
      document_type: null,
      document_number: '12341234',
      accept_terms: true,
      approval_date: '2023-02-01',
      skin_type: SkinType.BLANCO,
      allergies: [],
      illnesses: [],
      virt_country: country,
      virt_city: city,
      fav_language: Language.ENGLISH,
    };

    await countryRepository.save(country);
    await countryRepository.save(country1);
    await cityRepository.save(city);
    await cityRepository.save(city1);
    await repository.save(initialPatient);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create patient', async () => {
    const patientCreate: Patient = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: 'Testing123$',
      active: true,
      name: 'Pedro',
      surname: 'Linares',
      phone: '12331233',
      cell_phone: '3125270304',
      date_of_birth: '1991-10-03',
      address: 'Ugarte 116B # 78B 62',
      city: null,
      country: null,
      gender: Gender.BINARIO,
      document_type: null,
      document_number: '12341234',
      accept_terms: true,
      approval_date: '2023-02-01',
      skin_type: SkinType.BLANCO,
      allergies: [],
      illnesses: [],
      virt_country: null,
      virt_city: null,
      fav_language: Language.SPANISH,
    };
    const patient: Patient = await service.create(patientCreate);
    expect(patient).not.toBeNull();
    expect(patient.name).toEqual('Pedro');
  });

  it('should update patient configuration preferences', async () => {
    let patientToUpdate: Patient = {
      ...initialPatient,
      virt_country: country1,
      virt_city: city1,
      fav_language: Language.SPANISH,
    };

    patientToUpdate = await service.update(patientToUpdate.id, patientToUpdate);
    expect(patientToUpdate.fav_language).toEqual(Language.SPANISH);
    expect(patientToUpdate.virt_city).toEqual(city1);
    expect(patientToUpdate.virt_country).toEqual(country1);
  });
});
