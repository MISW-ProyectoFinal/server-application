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
import { Treatment } from './../treatment/entities/treatment.entity';

describe('CaseService', () => {
  let caseRepository: Repository<Case>;
  let treatmentRepository: Repository<Treatment>;
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
  let treatment1: Treatment;

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
    treatmentRepository = module.get<Repository<Treatment>>(
      getRepositoryToken(Treatment),
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
    await treatmentRepository.delete({});
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

    treatment1 = {
      id: faker.datatype.uuid(),
      start_date: '2023-02-20',
      end_date: null,
      description: faker.lorem.paragraph(),
      injury: injury1,
      caso: case1,
      treatment_progresses: [],
    };
    await treatmentRepository.save(treatment1);
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

  it('should assign case to a doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONFIRMAR;

    const caseData = {
      ...case1,
      ...{
        cci: '1234567812341234',
        amount: 6000000,
        currency_type: CurrencyType.COP,
      },
    };

    const caseInstance: Case = await caseService.assignCase(
      case1.id,
      caseData,
      doctor1.id,
    );
    expect(caseInstance.doctor.id).toEqual(doctor1.id);
  });

  it('should find all', async () => {
    const caseData = {
      ...case1,
      ...{ doctor: doctor1 },
    };

    const allCase: Case[] = await caseService.findAll(
      doctor1.id,
      CaseStatus.PENDIENTE,
    );
    expect(allCase).not.toBeNull();
  });

  it('should not find all', async () => {
    const caseData = {
      ...case1,
      ...{ doctor: doctor1 },
    };

    try {
      await caseService.findAll(faker.datatype.uuid(), CaseStatus.PENDIENTE);
    } catch (error) {
      expect(error.message).toBe('El doctor no pudo ser encontrado');
    }
  });

  it('should not asign case to a doctor', async () => {
    const caseData = {
      ...case1,
      ...{ doctor: doctor1 },
    };

    try {
      await caseService.assignCase(case1.id, caseData, faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe('Doctor no encontrado');
    }
  });

  it('should not find one case', async () => {
    try {
      await caseService.findOne(faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe('No se logra encontrar el caso en el sistema');
    }
  });

  it('should find one case', async () => {
    const caseFind: Case = await caseService.findOne(case1.id);
    expect(caseFind).not.toBeNull();
  });

  it('should accept a request to take case by a doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONFIRMAR;

    const caseInstance: Case = await caseService.answerRequest(
      case1.id,
      'yes',
      patient1.id,
    );
    expect(caseInstance.case_status).toEqual(CaseStatus.EN_PROCESO);
  });

  it('should refuse a request to take case by a doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONFIRMAR;

    const caseInstance: Case = await caseService.answerRequest(
      case1.id,
      'no',
      patient1.id,
    );
    expect(caseInstance.case_status).toEqual(CaseStatus.PENDIENTE);
    expect(caseInstance.doctor).toEqual(null);
  });

  it('should unassign case to myself as doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONFIRMAR;
    await caseRepository.save(case1);

    const caseInstance: Case = await caseService.unassignCase(
      case1.id,
      doctor1.id,
    );

    expect(caseInstance.doctor).toEqual(null);
    expect(caseInstance.case_status).toEqual(CaseStatus.PENDIENTE);
  });

  it('should not unassing case', async () => {
    case1.doctor = null;
    case1.case_status = CaseStatus.POR_CONFIRMAR;
    await caseRepository.save(case1);

    try {
      await caseService.unassignCase(case1.id, doctor1.id);
    } catch (error) {
      expect(error.message).toBe('No es posible desasignar este caso');
    }
  });

  it('should not unassing case for other role different to a doctor', async () => {
    case1.doctor = null;
    case1.case_status = CaseStatus.POR_CONFIRMAR;
    await caseRepository.save(case1);

    try {
      await caseService.unassignCase(case1.id, faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe('Doctor no encontrado');
    }
  });

  it('should not unassing an unexistent case', async () => {
    try {
      await caseService.unassignCase(faker.datatype.uuid(), doctor1.id);
    } catch (error) {
      expect(error.message).toBe('Caso no encontrado');
    }
  });

  it('should finish my case as doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.EN_PROCESO;
    case1.treatments = [treatment1];
    await caseRepository.save(case1);

    const caseInstance: Case = await caseService.finishCase(
      case1.id,
      doctor1.id,
    );

    expect(caseInstance.case_status).toEqual(CaseStatus.POR_CONCLUIR);
  });

  it('should not finish case by its status', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONFIRMAR;
    await caseRepository.save(case1);

    try {
      await caseService.finishCase(case1.id, doctor1.id);
    } catch (error) {
      expect(error.message).toBe('No es posible concluir este caso');
    }
  });

  it('should not finish case as a role different to a doctor', async () => {
    case1.doctor = null;
    case1.case_status = CaseStatus.EN_PROCESO;
    await caseRepository.save(case1);

    try {
      await caseService.finishCase(case1.id, faker.datatype.uuid());
    } catch (error) {
      expect(error.message).toBe('Doctor no encontrado');
    }
  });

  it('should not finish an unexistent case', async () => {
    try {
      await caseService.finishCase(faker.datatype.uuid(), doctor1.id);
    } catch (error) {
      expect(error.message).toBe('Caso no encontrado');
    }
  });

  it('should accept a request to finish case by a doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONCLUIR;
    await caseRepository.save(case1);

    const caseInstance: Case = await caseService.confirmConclusion(
      case1.id,
      'yes',
      patient1.id,
    );
    expect(caseInstance.case_status).toEqual(CaseStatus.CERRADO);
    expect(caseInstance.end_date).not.toBeNull();
  });

  it('should refuse a request to take case by a doctor', async () => {
    case1.doctor = doctor1;
    case1.case_status = CaseStatus.POR_CONCLUIR;
    await caseRepository.save(case1);

    const caseInstance: Case = await caseService.confirmConclusion(
      case1.id,
      'no',
      patient1.id,
    );
    expect(caseInstance.case_status).toEqual(CaseStatus.EN_PROCESO);
    expect(caseInstance.end_date).toBeNull();
  });
});
