import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Injury } from './../injury/entities/injury.entity';
import { InjuryService } from './../injury/injury.service';
import { Patient } from './../patient/entities/patient.entity';
import { PatientService } from './../patient/patient.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { AutomaticCaseService } from './automatic_case.service';
import { AutomaticCase } from './entities/automatic_case.entity';
import { faker } from '@faker-js/faker';
import { Gender } from './../gender/gender.enum';
import { SkinType } from './../skin_type/skin_type.enum';
import { Language } from './../language/language.enum';
import { InjuryType } from './../injury_type/injury_type.enum';
import { InjuryShape } from './../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../injury_distribution/injury_distribution.enum';
import { CaseStatus } from './../case_status/case_status.enum';

describe('AutomaticCaseService', () => {
  let patientRepository: Repository<Patient>;
  let injuryRepository: Repository<Injury>;
  let automaticCaseRepository: Repository<AutomaticCase>;

  let patientService: PatientService;
  let injuryService: InjuryService;
  let automaticCaseService: AutomaticCaseService;

  let patient1: Patient;
  let injury1: Injury;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [PatientService, InjuryService, AutomaticCaseService],
    }).compile();

    patientService = module.get<PatientService>(PatientService);
    injuryService = module.get<InjuryService>(InjuryService);
    automaticCaseService =
      module.get<AutomaticCaseService>(AutomaticCaseService);

    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    injuryRepository = module.get<Repository<Injury>>(
      getRepositoryToken(Injury),
    );
    automaticCaseRepository = module.get<Repository<AutomaticCase>>(
      getRepositoryToken(AutomaticCase),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(patientService).toBeDefined();
    expect(injuryService).toBeDefined();
    expect(automaticCaseService).toBeDefined();
  });

  const seedDatabase = async () => {
    await patientRepository.delete({});
    await injuryRepository.delete({});
    await automaticCaseRepository.delete({});

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

    injury1 = {
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

    await injuryRepository.save(injury1);
  };

  it('should create automatic case', async () => {
    const automaticCaseToCreate: AutomaticCase = {
      id: faker.datatype.uuid(),
      case_status: CaseStatus.PENDIENTE,
      generated_date: '2023-02-01',
      automatic_diagnoses: [],
      injury: null,
    };
    const automaticCase: AutomaticCase = await automaticCaseService.create(
      automaticCaseToCreate,
      injury1,
      patient1,
    );
    expect(automaticCase).not.toBeNull();
    expect(automaticCase.injury.id).toEqual(injury1.id);
  });


  it('should find one automatic case', async () => {
    const automaticCaseToCreate: AutomaticCase = {
      id: faker.datatype.uuid(),
      case_status: CaseStatus.PENDIENTE,
      generated_date: '2023-02-01',
      automatic_diagnoses: [],
      injury: null,
    };
    const automaticCase: AutomaticCase = await automaticCaseService.create(
      automaticCaseToCreate,
      injury1,
      patient1,
    );

    const findAutomaticCase: AutomaticCase = await automaticCaseService.findOne(automaticCase.id)
    expect(findAutomaticCase).not.toBeNull();
  });


  it('should find all automatic case', async () => {
    const automaticCaseToCreate: AutomaticCase = {
      id: faker.datatype.uuid(),
      case_status: CaseStatus.PENDIENTE,
      generated_date: '2023-02-01',
      automatic_diagnoses: [],
      injury: null,
    };
    const automaticCase: AutomaticCase = await automaticCaseService.create(
      automaticCaseToCreate,
      injury1,
      patient1,
    );

    const findAllAutomaticCase: AutomaticCase[] = await automaticCaseService.findAll("Pendiente")
    expect(findAllAutomaticCase).not.toBeNull();
  });

});
