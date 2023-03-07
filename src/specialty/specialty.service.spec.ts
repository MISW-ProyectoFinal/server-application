import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';
import { faker } from '@faker-js/faker';

describe('SpecialtyService', () => {
  let specialtyService: SpecialtyService;
  let specialtyRepository: Repository<Specialty>;

  let specialty1: Specialty;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [SpecialtyService],
    }).compile();

    specialtyService = module.get<SpecialtyService>(SpecialtyService);
    specialtyRepository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await specialtyRepository.delete({});

    specialty1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      specifications: [],
      doctor_specialties: [],
    };

    await specialtyRepository.save(specialty1);
  };

  it('should be defined', () => {
    expect(specialtyService).toBeDefined();
  });

  it('should create an specialty', async () => {
    const specialty2 = {
      ...specialty1,
      ...{
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
      },
    };

    const createdSpecialty: Specialty = await specialtyService.create(
      specialty2,
    );
    expect(createdSpecialty).not.toBeNull();
    expect(createdSpecialty.id).toEqual(specialty2.id);
  });

  it('should list all specialties', async () => {
    const specialties: Specialty[] = await specialtyService.findAll();
    expect(specialties).not.toBeNull();
    expect(specialties.length).toEqual(1);
  });
});
