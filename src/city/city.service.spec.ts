import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { CityService } from './city.service';
import { City } from './entities/city.entity';
import { Country } from './../country/entities/country.entity';
import { faker } from '@faker-js/faker';

describe('CityService', () => {
  let cityService: CityService;

  let cityRepository: Repository<City>;
  let countryRepository: Repository<Country>;

  let country1: Country;
  let city1: City;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [CityService],
    }).compile();

    cityService = module.get<CityService>(CityService);

    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
    countryRepository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await cityRepository.delete({});
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

    city1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      users: [],
      virt_users: [],
      country: country1,
    };
    await cityRepository.save(city1);
  };

  it('should be defined', () => {
    expect(cityService).toBeDefined();
  });

  it('should create a city', async () => {
    const city2 = {
      ...city1,
      ...{
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
      },
    };

    const createdCity: City = await cityService.create(city2);
    expect(createdCity).not.toBeNull();
    expect(createdCity.id).toEqual(city2.id);
  });

  it('should list all countries', async () => {
    const cities: City[] = await cityService.findAll();
    expect(cities).not.toBeNull();
    expect(cities.length).toEqual(1);
  });
});
