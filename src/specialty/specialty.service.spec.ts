import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';

describe('SpecialtyService', () => {
  let service: SpecialtyService;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [SpecialtyService],
    }).compile();

    service = module.get<SpecialtyService>(SpecialtyService);
    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
