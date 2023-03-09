import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender } from '../gender/gender.enum';
import { Allergy } from '../allergy/entities/allergy.entity';
import { Language } from '../language/language.enum';
import { Patient } from '../patient/entities/patient.entity';
import { SkinType } from '../skin_type/skin_type.enum';
import { Repository } from 'typeorm';
import { PatientAllergyService } from './patient_allergy.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PatientAllergyService', () => {
  let service: PatientAllergyService;

  let patientRepository: Repository<Patient>;
  let patient: Patient;

  let allergyRepository: Repository<Allergy>;
  let allergy: Allergy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [PatientAllergyService],
    }).compile();

    service = module.get<PatientAllergyService>(PatientAllergyService);

    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    allergyRepository = module.get<Repository<Allergy>>(
      getRepositoryToken(Allergy),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await patientRepository.delete({});
    await allergyRepository.delete({});

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

    allergy = {
      id: faker.datatype.uuid(),
      name: 'De prueba',
      specifications: null,
      patients: null,
      symptoms: null,
    };

    await patientRepository.save(patient);
    await allergyRepository.save(allergy);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create PatienAllergy', async () => {
    const id = patient.id;
    const allergyId = [allergy.id];
    const saveAllergy = await service.create(id, allergyId);
    expect(saveAllergy).toBe(true);
  });

  it('should not be create PatienAllergy by patient not found', async () => {
    const id = faker.datatype.uuid();
    const allergyId = [allergy.id];

    try {
      await service.create(id, allergyId);
    } catch (error) {
      expect(error.message).toBe('patient not found');
    }
  });

  it('should not be create PatienAllergy by allergy not found', async () => {
    const id = patient.id;
    const allergyId = [
      faker.datatype.uuid(),
      faker.datatype.uuid(),
      faker.datatype.uuid(),
    ];

    try {
      await service.create(id, allergyId);
    } catch (error) {
      console.log(error);
      expect(error.message).toBe('allergyes not fund');
    }
  });
});
