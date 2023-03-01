import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Case } from './../case/entities/case.entity';
import { Doctor } from './../doctor/entities/doctor.entity';
import { Injury } from './../injury/entities/injury.entity';
import { Patient } from './../patient/entities/patient.entity';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Treatment } from './../treatment/entities/treatment.entity';
import { TreatmentProgress } from './../treatment_progress/entities/treatment_progress.entity';
import { Repository } from 'typeorm';
import { TreatmentProgressPhoto } from './entities/treatment_progress_photo.entity';
import { TreatmentProgressPhotoService } from './treatment_progress_photo.service';
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

describe('TreatmentProgressPhotoService', () => {
  let injuryRepository: Repository<Injury>;
  let caseRepository: Repository<Case>;
  let patientRepository: Repository<Patient>;
  let doctorRepository: Repository<Doctor>;
  let treatmentRepository: Repository<Treatment>;
  let treatmentProgressRepository: Repository<TreatmentProgress>;
  let treatmentProgressPhotoRepository: Repository<TreatmentProgressPhoto>;

  let treatmentProgressPhotoService: TreatmentProgressPhotoService;

  let doctor1: Doctor;
  let patient1: Patient;
  let injury1: Injury;
  let case1: Case;
  let treatment1: Treatment;
  let treatmentProgress1: TreatmentProgress;
  let treatmentProgressPhoto1: TreatmentProgressPhoto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [TreatmentProgressPhotoService],
    }).compile();

    treatmentProgressPhotoService = module.get<TreatmentProgressPhotoService>(
      TreatmentProgressPhotoService,
    );

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
    treatmentProgressPhotoRepository = module.get<
      Repository<TreatmentProgressPhoto>
    >(getRepositoryToken(TreatmentProgressPhoto));
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(treatmentProgressPhotoService).toBeDefined();
  });

  const seedDatabase = async () => {
    await treatmentProgressPhotoRepository.delete({});
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

    treatmentProgressPhoto1 = {
      id: faker.datatype.uuid(),
      creation_date: '2023-02-20',
      file_name: faker.image.imageUrl(),
      treatment_progress: treatmentProgress1,
    };
    await treatmentProgressPhotoRepository.save(treatmentProgressPhoto1);
  };

  it('should create treatment progress photo', async () => {
    const treatmentProgressPhotoToCreate: TreatmentProgressPhoto = {
      id: faker.datatype.uuid(),
      creation_date: '2023-02-20',
      file_name: faker.image.imageUrl(),
      treatment_progress: null,
    };

    const treatmentProgressPhoto: TreatmentProgressPhoto =
      await treatmentProgressPhotoService.create(
        treatmentProgress1,
        treatmentProgressPhotoToCreate,
      );
    expect(treatmentProgressPhoto).not.toBeNull();
    expect(treatmentProgressPhoto.treatment_progress.id).toEqual(
      treatmentProgress1.id,
    );
  });
});
