import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { AllergyService } from './allergy.service';
import { Allergy } from './entities/allergy.entity';

describe('AllergyService', () => {
  let repository: Repository<Allergy>;
  let service: AllergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [AllergyService],
    }).compile();

    service = module.get<AllergyService>(AllergyService);
    repository = module.get<Repository<Allergy>>(getRepositoryToken(Allergy));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
