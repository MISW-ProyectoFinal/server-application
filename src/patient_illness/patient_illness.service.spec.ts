import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender } from '../gender/gender.enum';
import { Illness } from '../illness/entities/illness.entity';
import { Language } from '../language/language.enum';
import { Patient } from '../patient/entities/patient.entity';
import { SkinType } from '../skin_type/skin_type.enum';
import { Repository } from 'typeorm';
import { PatientIllnessService } from './patient_illness.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PatientIllnessService', () => {
  let service: PatientIllnessService;

  let patientRepository: Repository<Patient>;
  let patient: Patient;

  let illnessRepository: Repository<Illness>;
  let illness: Illness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [PatientIllnessService],
    }).compile();

    service = module.get<PatientIllnessService>(PatientIllnessService);

    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    illnessRepository = module.get<Repository<Illness>>(
      getRepositoryToken(Illness),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await patientRepository.delete({});
    await illnessRepository.delete({});

    patient = {
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
      fav_language: Language.ENGLISH,
      notification_token: null,
    };

    illness = {
      id: faker.datatype.uuid(),
      name: 'De prueba',
      specifications: null,
      patients: null,
      symptoms: null,
    };

    await patientRepository.save(patient);
    await illnessRepository.save(illness);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create PatienIllness', async () => {
    const id = patient.id;
    const illnessId = [illness.id];
    const saveIllness = await service.create(id, illnessId);
    expect(saveIllness).toBe(true);
  });

  it('should not be create PatienIllness by patient not found', async () => {
    const id = faker.datatype.uuid();
    const illnessId = [illness.id];

    try {
      await service.create(id, illnessId);
    } catch (error) {
      expect(error.message).toBe('patient not found');
    }
  });

  it('should not be create PatienIllness by illness not found', async () => {
    const id = patient.id;
    const illnessId = [
      faker.datatype.uuid(),
      faker.datatype.uuid(),
      faker.datatype.uuid(),
    ];

    try {
      await service.create(id, illnessId);
    } catch (error) {
      console.log(error);
      expect(error.message).toBe('illnesses not fund');
    }
  });
});
