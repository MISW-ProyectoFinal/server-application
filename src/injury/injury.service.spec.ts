import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InjuryPhoto } from './../injury_photo/entities/injury_photo.entity';
import { Patient } from './../patient/entities/patient.entity';
import { Repository } from 'typeorm';
import { InjuryPhotoService } from './../injury_photo/injury_photo.service';
import { PatientService } from './../patient/patient.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Injury } from './entities/injury.entity';
import { InjuryService } from './injury.service';
import { Language } from './../language/language.enum';
import { SkinType } from './../skin_type/skin_type.enum';
import { Gender } from './../gender/gender.enum';
import { faker } from '@faker-js/faker';
import { InjuryType } from './../injury_type/injury_type.enum';
import { InjuryShape } from './../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../injury_distribution/injury_distribution.enum';

describe('InjuryService', () => {
  let injuryRepository: Repository<Injury>;
  let patientRepository: Repository<Patient>;
  let injuryPhotoRepository: Repository<InjuryPhoto>;

  let injuryService: InjuryService;
  let patientService: PatientService;
  let injuryPhotoService: InjuryPhotoService;

  let patient1: Patient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [InjuryService, PatientService, InjuryPhotoService],
    }).compile();

    injuryService = module.get<InjuryService>(InjuryService);
    patientService = module.get<PatientService>(PatientService);
    injuryPhotoService = module.get<InjuryPhotoService>(InjuryPhotoService);

    injuryRepository = module.get<Repository<Injury>>(
      getRepositoryToken(Injury),
    );
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    injuryPhotoRepository = module.get<Repository<InjuryPhoto>>(
      getRepositoryToken(InjuryPhoto),
    );
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(injuryService).toBeDefined();
  });

  const seedDatabase = async () => {
    await injuryRepository.delete({});
    await patientRepository.delete({});
    await injuryPhotoRepository.delete({});

    patient1 = {
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

    await patientRepository.save(patient1);
  };

  it('should create injury', async () => {
    const injuryToCreate: Injury = {
      id: faker.datatype.uuid(),
      type: InjuryType.AMPOLLA,
      shape: InjuryShape.ANILLO,
      number: 2,
      distribution: InjuryDistribution.ASIMETRICA,
      description: faker.lorem.paragraph(),
      color: faker.color.human(),
      location: 'Espalda',
      symptoms: [],
      cases: [],
      treatments: [],
      photos: [],
      automatic_cases: [],
      patient: patient1,
    };
    const injury: Injury = await injuryService.create(injuryToCreate);
    expect(injury).not.toBeNull();
    expect(injury.location).toEqual('Espalda');
  });

  it('should find injury', async () => {
    const injuryToCreate: Injury = {
      id: faker.datatype.uuid(),
      type: InjuryType.AMPOLLA,
      shape: InjuryShape.ANILLO,
      number: 2,
      distribution: InjuryDistribution.ASIMETRICA,
      description: faker.lorem.paragraph(),
      color: faker.color.human(),
      location: 'Espalda',
      symptoms: [],
      cases: [],
      treatments: [],
      photos: [],
      automatic_cases: [],
      patient: patient1,
    };
    const injury: Injury = await injuryService.create(injuryToCreate);
    const findInjury = await injuryService.findOne(injury.id);
    expect(findInjury).not.toBeNull();
  });

  it('should find injury', async () => {
    try {
      await injuryService.findOne(faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe(
        'No se logra encontrar la lesión en el sistema',
      );
    }
  });

  it('should find all injury by patient', async () => {
    const injuryToCreate: Injury = {
      id: faker.datatype.uuid(),
      type: InjuryType.AMPOLLA,
      shape: InjuryShape.ANILLO,
      number: 2,
      distribution: InjuryDistribution.ASIMETRICA,
      description: faker.lorem.paragraph(),
      color: faker.color.human(),
      location: 'Espalda',
      symptoms: [],
      cases: [],
      treatments: [],
      photos: [],
      automatic_cases: [],
      patient: patient1,
    };
    await injuryService.create(injuryToCreate);
    const findInjury = await injuryService.findAll(patient1.id);
    expect(findInjury).not.toBeNull();
  });
});
