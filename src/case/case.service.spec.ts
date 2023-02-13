import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Injury } from './../injury/entities/injury.entity';
import { Patient } from './../patient/entities/patient.entity';
import { Repository } from 'typeorm';
import { DoctorService } from './../doctor/doctor.service';
import { InjuryService } from './../injury/injury.service';
import { PatientService } from './../patient/patient.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { CaseService } from './case.service';
import { Case } from './entities/case.entity';
import { Language } from './../language/language.enum';
import { SkinType } from './../skin_type/skin_type.enum';
import { Gender } from './../gender/gender.enum';
import { faker } from '@faker-js/faker';
import { InjuryType } from './../injury_type/injury_type.enum';
import { InjuryShape } from './../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../injury_distribution/injury_distribution.enum';
import { CurrencyType } from './../currency_type/currency_type.enum';
import { PaymentStatus } from './../payment_status/payment_status.enum';
import { CaseStatus } from './../case_status/case_status.enum';

describe('CaseService', () => {
  let caseRepository: Repository<Case>;
  let patientRepository: Repository<Patient>;
  let doctorRepository: Repository<Doctor>;
  let injuryRepository: Repository<Injury>;

  let caseService: CaseService;
  let patientService: PatientService;
  let doctorService: DoctorService;
  let injuryService: InjuryService;

  let patient1: Patient;
  let injury1: Injury;
  let doctor1: Doctor;
  let case1: Case;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [PatientService, DoctorService, InjuryService, CaseService],
    }).compile();

    caseService = module.get<CaseService>(CaseService);
    patientService = module.get<PatientService>(PatientService);
    doctorService = module.get<DoctorService>(DoctorService);
    injuryService = module.get<InjuryService>(InjuryService);

    caseRepository = module.get<Repository<Case>>(getRepositoryToken(Case));
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    injuryRepository = module.get<Repository<Injury>>(
      getRepositoryToken(Injury),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(caseService).toBeDefined();
    expect(patientService).toBeDefined();
    expect(doctorService).toBeDefined();
    expect(injuryService).toBeDefined();
  });

  const seedDatabase = async () => {
    await caseRepository.delete({});
    await patientRepository.delete({});
    await doctorRepository.delete({});
    await injuryRepository.delete({});

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

    case1 = {
      id: faker.datatype.uuid(),
      case_status: CaseStatus.PENDIENTE,
      start_date: '2023-02-01',
      end_date: null,
      pending_payment: false,
      payment_status: PaymentStatus.PENDIENTE,
      amount: null,
      cci: '1234567812341234',
      currency_type: CurrencyType.USD,
      doctor: null,
      injury: injury1,
      treatments: [],
    };
    await caseRepository.save(case1);

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
  };

  it('should create case', async () => {
    const caseToCreate: Case = {
      id: faker.datatype.uuid(),
      case_status: CaseStatus.PENDIENTE,
      start_date: '2023-02-01',
      end_date: null,
      pending_payment: false,
      payment_status: PaymentStatus.PENDIENTE,
      amount: null,
      cci: '1234567812341234',
      currency_type: CurrencyType.USD,
      doctor: null,
      injury: null,
      treatments: [],
    };
    const caseInstance: Case = await caseService.create(
      caseToCreate,
      injury1,
      patient1,
    );
    expect(caseInstance).not.toBeNull();
    expect(caseInstance.injury.id).toEqual(injury1.id);
  });

  it('should asign case to a doctor', async () => {
    const caseData = {
      ...case1,
      ...{ doctor: doctor1 },
    };
    const caseInstance: Case = await caseService.asignCase(
      case1.id,
      caseData,
      doctor1,
    );
    expect(caseInstance.doctor.id).toEqual(doctor1.id);
  });
});
