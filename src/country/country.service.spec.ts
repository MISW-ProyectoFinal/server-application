import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { faker } from '@faker-js/faker';

describe('CountryService', () => {
  let countryService: CountryService;
  let countryRepository: Repository<Country>;

  let country1: Country;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [CountryService],
    }).compile();

    countryService = module.get<CountryService>(CountryService);
    countryRepository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await countryRepository.delete({});

    country1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      cities: [],
      users: [],
      virt_users: [],
      document_types: [],
    };

    await countryRepository.save(country1);
  };

  it('should be defined', () => {
    expect(countryService).toBeDefined();
  });

  it('should create a country', async () => {
    const country2 = {
      ...country1,
      ...{
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
      },
    };

    const createdCountry: Country = await countryService.create(country2);
    expect(createdCountry).not.toBeNull();
    expect(createdCountry.id).toEqual(country2.id);
  });

  it('should list all countries', async () => {
    const countries: Country[] = await countryService.findAll();
    expect(countries).not.toBeNull();
    expect(countries.length).toEqual(1);
  });
});
