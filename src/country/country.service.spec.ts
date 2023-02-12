import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';

describe('CountryService', () => {
  let service: CountryService;
  let repository: Repository<Country>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [CountryService],
    }).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get<Repository<Country>>(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
