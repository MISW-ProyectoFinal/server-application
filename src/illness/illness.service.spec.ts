import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Illness } from './entities/illness.entity';
import { IllnessService } from './illness.service';
import { faker } from '@faker-js/faker';

describe('IllnessService', () => {
  let service: IllnessService;
  let repository: Repository<Illness>;

  let illness1: Illness;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [IllnessService],
    }).compile();

    service = module.get<IllnessService>(IllnessService);
    repository = module.get<Repository<Illness>>(getRepositoryToken(Illness));
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});

    illness1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      specifications: [],
      symptoms: [],
      patients: [],
    };

    await repository.save(illness1);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a country', async () => {
    const illness2 = {
      ...illness1,
      ...{
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
      },
    };

    const createdIllness: Illness = await service.create(illness2);
    expect(createdIllness).not.toBeNull();
    expect(createdIllness.id).toEqual(illness2.id);
  });

  it('should list all countries', async () => {
    const illnesses: Illness[] = await service.findAll();
    expect(illnesses).not.toBeNull();
    expect(illnesses.length).toEqual(1);
  });
});
