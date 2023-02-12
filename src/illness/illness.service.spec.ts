import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Illness } from './entities/illness.entity';
import { IllnessService } from './illness.service';

describe('IllnessService', () => {
  let service: IllnessService;
  let repository: Repository<Illness>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [IllnessService],
    }).compile();

    service = module.get<IllnessService>(IllnessService);
    repository = module.get<Repository<Illness>>(getRepositoryToken(Illness));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
