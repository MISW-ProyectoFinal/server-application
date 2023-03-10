import { Test, TestingModule } from '@nestjs/testing';
import { CaseService } from './../case/case.service';
import { DoctorService } from './../doctor/doctor.service';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Patient } from './../patient/entities/patient.entity';
import { PatientService } from './../patient/patient.service';
import { Repository } from 'typeorm';
import { Treatment } from './entities/treatment.entity';
import { TreatmentService } from './treatment.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Case } from './../case/entities/case.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Injury } from './../injury/entities/injury.entity';
import { Gender } from './../gender/gender.enum';
import { SkinType } from './../skin_type/skin_type.enum';
import { Language } from './../language/language.enum';
import { InjuryType } from './../injury_type/injury_type.enum';
import { InjuryShape } from './../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../injury_distribution/injury_distribution.enum';
import { CaseStatus } from './../case_status/case_status.enum';
import { PaymentStatus } from './../payment_status/payment_status.enum';
import { CurrencyType } from './../currency_type/currency_type.enum';
import { NotificationService } from './../notification/notification.service';

describe('TreatmentService', () => {
  let caseRepository: Repository<Case>;
  let patientRepository: Repository<Patient>;
  let doctorRepository: Repository<Doctor>;
  let treatmentRepository: Repository<Treatment>;
  let injuryRepository: Repository<Injury>;

  let caseService: CaseService;
  let patientService: PatientService;
  let doctorService: DoctorService;
  let treatmentService: TreatmentService;

  let patient1: Patient;
  let treatment1: Treatment;
  let injury1: Injury;
  let doctor1: Doctor;
  let case1: Case;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [
        TreatmentService,
        CaseService,
        DoctorService,
        NotificationService,
        PatientService,
      ],
    }).compile();

    caseService = module.get<CaseService>(CaseService);
    patientService = module.get<PatientService>(PatientService);
    doctorService = module.get<DoctorService>(DoctorService);
    treatmentService = module.get<TreatmentService>(TreatmentService);

    caseRepository = module.get<Repository<Case>>(getRepositoryToken(Case));
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    treatmentRepository = module.get<Repository<Treatment>>(
      getRepositoryToken(Treatment),
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
    expect(treatmentService).toBeDefined();
  });

  const seedDatabase = async () => {
    await caseRepository.delete({});
    await patientRepository.delete({});
    await doctorRepository.delete({});
    await treatmentRepository.delete({});
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
      gender: Gender.MASCULINO,
      document_type: null,
      document_number: '12341234',
      accept_terms: true,
      approval_date: '2023-02-01',
      skin_type: SkinType.MORENO,
      allergies: [],
      illnesses: [],
      injuries: [],
      virt_country: null,
      virt_city: null,
      fav_language: Language.SPANISH,
      notification_token: null,
    };
    await patientRepository.save(patient1);

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
      notification_token: null,
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
      patient: patient1,
    };
    await injuryRepository.save(injury1);

    case1 = {
      id: faker.datatype.uuid(),
      case_status: CaseStatus.EN_PROCESO,
      start_date: '2023-02-01',
      end_date: null,
      pending_payment: false,
      payment_status: PaymentStatus.PENDIENTE,
      amount: null,
      cci: '1234567812341234',
      currency_type: CurrencyType.USD,
      doctor: doctor1,
      injury: injury1,
      treatments: [],
    };
    await caseRepository.save(case1);

    treatment1 = {
      id: faker.datatype.uuid(),
      start_date: '2023-02-20',
      end_date: null,
      diagnosis: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      injury: injury1,
      caso: case1,
      treatment_progresses: [],
    };
    await treatmentRepository.save(treatment1);
  };

  it('should create treatment', async () => {
    const treatmentToCreate: Treatment = {
      id: faker.datatype.uuid(),
      start_date: '2023-02-20',
      end_date: null,
      diagnosis: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      injury: injury1,
      caso: case1,
      treatment_progresses: [],
    };
    const treatment: Treatment = await treatmentService.create(
      treatmentToCreate,
      case1.id,
      doctor1.id,
    );
    expect(treatment).not.toBeNull();
    expect(treatment.caso.id).toEqual(case1.id);
  });

  it('should not find a treatment', async () => {
    try {
      await treatmentService.findOne(faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe('No se encontró el tratamiento en el sistema');
    }
  });

  it('should find a treatment', async () => {
    const treatment: Treatment = await treatmentService.findOne(treatment1.id);
    expect(treatment).not.toBeNull();
  });
});
