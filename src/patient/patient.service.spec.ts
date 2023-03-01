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
import { Doctor } from './../doctor/entities/doctor.entity';
import { Injury } from './../injury/entities/injury.entity';
import { InjuryType } from './../injury_type/injury_type.enum';
import { InjuryShape } from './../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../injury_distribution/injury_distribution.enum';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('PatientService', () => {
  let repository: Repository<Patient>;
  let countryRepository: Repository<Country>;
  let cityRepository: Repository<City>;
  let doctorRepository: Repository<Doctor>;
  let injuryRepository: Repository<Injury>;

  let service: PatientService;

  let country: Country;
  let city: City;
  let country1: Country;
  let city1: City;
  let initialPatient: Patient;
  let doctor1: Doctor;
  let injury1: Injury;

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
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    injuryRepository = module.get<Repository<Injury>>(
      getRepositoryToken(Injury),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    await cityRepository.delete({});
    await countryRepository.delete({});
    await doctorRepository.delete({});
    await injuryRepository.delete({});

    country = {
      id: faker.datatype.uuid(),
      name: 'Canada',
      users: [],
      cities: [],
      document_types: [],
      virt_users: [],
    };
    await countryRepository.save(country);

    country1 = {
      id: faker.datatype.uuid(),
      name: 'Colombia',
      users: [],
      cities: [],
      document_types: [],
      virt_users: [],
    };
    await countryRepository.save(country1);

    city = {
      id: faker.datatype.uuid(),
      name: 'Vancouver',
      country: country,
      users: [],
      virt_users: [],
    };
    await cityRepository.save(city);

    city1 = {
      id: faker.datatype.uuid(),
      name: 'Bogotá',
      country: country1,
      users: [],
      virt_users: [],
    };
    await cityRepository.save(city1);

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
      injuries: [],
      virt_country: country,
      virt_city: city,
      fav_language: Language.ENGLISH,
    };
    await repository.save(initialPatient);

    doctor1 = {
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
      gender: Gender.MASCULINO,
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
    await doctorRepository.save(doctor1);

    injury1 = {
      id: faker.datatype.uuid(),
      type: InjuryType.AMPOLLA,
      shape: InjuryShape.ANILLO,
      number: 2,
      distribution: InjuryDistribution.ASIMETRICA,
      description: faker.lorem.paragraph(),
      color: faker.color.human(),
      location: 'Cuello',
      symptoms: [],
      cases: [],
      treatments: [],
      photos: [],
      automatic_cases: [],
      patient: initialPatient,
    };
    await injuryRepository.save(injury1);
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
      injuries: [],
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

  it('should find patient by email', async () => {
    const patient = await service.findByEmail(initialPatient.email);
    expect(patient.id).toEqual(initialPatient.id);
    expect(patient.email).toEqual(initialPatient.email);
  });

  it('should get patient clinic-history as doctor', async () => {
    const patient = await service.clinicalHistory(
      initialPatient.id,
      doctor1.id,
    );
    expect(patient).not.toBeNull();
    expect(patient.id).toEqual(initialPatient.id);
  });

  it('should not get patient clinic-history without being a doctor', async () => {
    try {
      await service.clinicalHistory(initialPatient.id, faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe(
        'No tiene autorización de visualizar el historial',
      );
    }
  });

  it('should not get clinic-history of a inexistent patient as a doctor', async () => {
    try {
      await service.clinicalHistory(faker.datatype.uuid(), doctor1.id);
    } catch (error) {
      expect(error.message).toBe(
        'El paciente consultado no se encuentra en el sistema',
      );
    }
  });

  it('should not get clinic-history of a patient who does not have injuries as a doctor', async () => {
    await injuryRepository.delete({});
    try {
      await service.clinicalHistory(initialPatient.id, doctor1.id);
    } catch (error) {
      expect(error.message).toBe(
        'El paciente consultado no puede ser consultado debido a que no ha registrado lesiones',
      );
    }
  });
});
