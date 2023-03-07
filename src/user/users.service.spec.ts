import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Gender } from '../gender/gender.enum';
import { Language } from './../language/language.enum';
import { UsersService } from './users.service';
import { ValidationError } from '@nestjs/common';
import { Country } from './../country/entities/country.entity';
import { City } from './../city/entities/city.entity';
import { faker } from '@faker-js/faker';

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let countryRepository: Repository<Country>;
  let cityRepository: Repository<City>;

  let user1: User;
  let country1: Country;
  let city1: City;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    countryRepository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    await cityRepository.delete({});
    await countryRepository.delete({});

    country1 = {
      id: faker.datatype.uuid(),
      name: 'Canada',
      users: [],
      cities: [],
      document_types: [],
      virt_users: [],
    };
    await countryRepository.save(country1);

    city1 = {
      id: faker.datatype.uuid(),
      name: 'Vancouver',
      country: country1,
      users: [],
      virt_users: [],
    };
    await cityRepository.save(city1);

    user1 = {
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
      city: city1,
      country: country1,
      gender: Gender.BINARIO,
      document_type: null,
      document_number: '12341234',
      virt_country: country1,
      virt_city: city1,
      fav_language: Language.ENGLISH,
    };
    await repository.save(user1);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const userToCreate: User = {
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
      city: city1,
      country: country1,
      gender: Gender.BINARIO,
      document_type: null,
      document_number: '12341234',
      virt_country: country1,
      virt_city: city1,
      fav_language: Language.ENGLISH,
    };
    const createdUser: User = await service.create(userToCreate);
    expect(createdUser).not.toBeNull();
    expect(createdUser.name).toEqual('Pedro');
  });

  it('should find user by email', async () => {
    const findedUser = await service.findByEmail(user1.email);
    expect(findedUser.id).toEqual(user1.id);
    expect(findedUser.email).toEqual(user1.email);
  });

  it('should not find user by email', async () => {
    try {
      await service.findByEmail(faker.internet.email());
    } catch (error) {
      expect(error.message).toBe('El usuario que esta buscando no existe');
    }
  });
});
