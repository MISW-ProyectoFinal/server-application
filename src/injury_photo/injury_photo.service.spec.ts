import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjuryPhotoService } from './injury_photo.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { InjuryPhoto } from './entities/injury_photo.entity';
import { faker } from '@faker-js/faker';

describe('InjuryPhotoService', () => {
  let injuryPhotoRepository: Repository<InjuryPhoto>;
  let injuryPhotoService: InjuryPhotoService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [InjuryPhotoService],
    }).compile();

    injuryPhotoService = module.get<InjuryPhotoService>(InjuryPhotoService);

    injuryPhotoRepository = module.get<Repository<InjuryPhoto>>(
      getRepositoryToken(InjuryPhoto),
    );
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await injuryPhotoRepository.delete({});
  };

  it('should be defined', () => {
    expect(injuryPhotoService).toBeDefined();
  });

  it('should create an injury photo', async () => {
    const injuryPhoto1 = {
      id: faker.datatype.uuid(),
      file_name: faker.image.imageUrl(),
      upload_date: new Date().toISOString().slice(0, 10),
      injury: null,
    };

    const createdInjuryPhoto: InjuryPhoto = await injuryPhotoService.create(
      injuryPhoto1,
    );

    expect(createdInjuryPhoto).not.toBeNull();
    expect(createdInjuryPhoto.id).toEqual(injuryPhoto1.id);
  });
});
