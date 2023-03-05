import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Case } from './../case/entities/case.entity';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Injury } from './../injury/entities/injury.entity';
import { Patient } from './../patient/entities/patient.entity';
import { Treatment } from './../treatment/entities/treatment.entity';
import { Repository } from 'typeorm';
import { TreatmentProgress } from './entities/treatment_progress.entity';
import { TreatmentProgressService } from './treatment_progress.service';
import { faker } from '@faker-js/faker';
import { Gender } from './../gender/gender.enum';
import { SkinType } from './../skin_type/skin_type.enum';
import { Language } from './../language/language.enum';
import { InjuryType } from './../injury_type/injury_type.enum';
import { InjuryShape } from './../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../injury_distribution/injury_distribution.enum';
import { CaseStatus } from './../case_status/case_status.enum';
import { PaymentStatus } from './../payment_status/payment_status.enum';
import { CurrencyType } from './../currency_type/currency_type.enum';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { TreatmentService } from './../treatment/treatment.service';
import { PatientService } from './../patient/patient.service';
import { DoctorService } from './../doctor/doctor.service';
import { NotificationService } from './../notification/notification.service';

describe('TreatmentProgressService', () => {
  let injuryRepository: Repository<Injury>;
  let caseRepository: Repository<Case>;
  let patientRepository: Repository<Patient>;
  let doctorRepository: Repository<Doctor>;
  let treatmentRepository: Repository<Treatment>;
  let treatmentProgressRepository: Repository<TreatmentProgress>;

  let treatmentService: TreatmentService;
  let treatmentProgressService: TreatmentProgressService;
  let patientService: PatientService;
  let doctorService: DoctorService;

  let patient1: Patient;
  let treatment1: Treatment;
  let injury1: Injury;
  let doctor1: Doctor;
  let case1: Case;
  let treatmentProgress1: TreatmentProgress;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [
        TreatmentProgressService,
        TreatmentService,
        DoctorService,
        PatientService,
        NotificationService,
      ],
    }).compile();

    treatmentService = module.get<TreatmentService>(TreatmentService);
    treatmentProgressService = module.get<TreatmentProgressService>(
      TreatmentProgressService,
    );
    doctorService = module.get<DoctorService>(DoctorService);
    patientService = module.get<PatientService>(PatientService);

    injuryRepository = module.get<Repository<Injury>>(
      getRepositoryToken(Injury),
    );
    caseRepository = module.get<Repository<Case>>(getRepositoryToken(Case));
    treatmentRepository = module.get<Repository<Treatment>>(
      getRepositoryToken(Treatment),
    );
    treatmentProgressRepository = module.get<Repository<TreatmentProgress>>(
      getRepositoryToken(TreatmentProgress),
    );
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(treatmentProgressService).toBeDefined();
    expect(treatmentService).toBeDefined();
    expect(doctorService).toBeDefined();
    expect(patientService).toBeDefined();
  });

  const seedDatabase = async () => {
    await treatmentProgressRepository.delete({});
    await treatmentRepository.delete({});
    await caseRepository.delete({});
    await injuryRepository.delete({});
    await patientRepository.delete({});
    await doctorRepository.delete({});

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
      start_date: '2023-02-27',
      end_date: null,
      pending_payment: false,
      payment_status: PaymentStatus.PENDIENTE,
      amount: 90000,
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

    treatmentProgress1 = {
      id: faker.datatype.uuid(),
      creation_date: '2023-02-20',
      treatment: treatment1,
      comment: faker.lorem.paragraph(),
      treatment_progress_photos: [],
    };
    await treatmentProgressRepository.save(treatmentProgress1);
  };

  it('should create treatment progress', async () => {
    const treatmentProgressToCreate: TreatmentProgress = {
      id: faker.datatype.uuid(),
      comment: faker.lorem.paragraph(),
      creation_date: '2023-02-26',
      treatment: null,
      treatment_progress_photos: [],
    };

    const treatmentProgress: TreatmentProgress =
      await treatmentProgressService.create(
        treatmentProgressToCreate,
        treatment1.id,
        patient1.id,
      );
    expect(treatmentProgress).not.toBeNull();
    expect(treatmentProgress.treatment.id).toEqual(treatment1.id);
  });

  it('should list treatment progresses of a treatment', async () => {
    const treatmentProgresses: TreatmentProgress[] =
      await treatmentProgressService.findAll(treatment1.id);
    expect(treatmentProgresses).not.toBeNull();
    expect(treatmentProgresses.length).toEqual(1);
  });

  it('should find a treatment progress', async () => {
    const treatmentProgress: TreatmentProgress =
      await treatmentProgressService.findOne(treatmentProgress1.id);
    expect(treatmentProgress).not.toBeNull();
    expect(treatmentProgress.comment).toEqual(treatmentProgress1.comment);
  });

  it('should not find a treatment progress', async () => {
    try {
      await treatmentProgressService.findOne(faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe(
        'No se encontró la evolución del tratamiento en el sistema',
      );
    }
  });
});
