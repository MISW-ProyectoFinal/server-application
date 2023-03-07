import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { AllergyService } from './allergy.service';
import { Allergy } from './entities/allergy.entity';
import { faker } from '@faker-js/faker';

describe('AllergyService', () => {
  let allergyRepository: Repository<Allergy>;
  let allergyService: AllergyService;

  let allergy1: Allergy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [AllergyService],
    }).compile();

    allergyService = module.get<AllergyService>(AllergyService);
    allergyRepository = module.get<Repository<Allergy>>(
      getRepositoryToken(Allergy),
    );
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await allergyRepository.delete({});

    allergy1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      specifications: [],
      symptoms: [],
      patients: [],
    };

    await allergyRepository.save(allergy1);
  };

  it('should be defined', () => {
    expect(allergyService).toBeDefined();
  });

  it('should create an allergy', async () => {
    const allergy2 = {
      ...allergy1,
      ...{
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
      },
    };

    const createdAllergy: Allergy = await allergyService.create(allergy2);
    expect(createdAllergy).not.toBeNull();
    expect(createdAllergy.id).toEqual(allergy2.id);
  });

  it('should list all allergies', async () => {
    const allergies: Allergy[] = await allergyService.findAll();
    expect(allergies).not.toBeNull();
    expect(allergies.length).toEqual(1);
  });
});
