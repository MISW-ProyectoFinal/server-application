import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Injury } from './../injury/entities/injury.entity';
import { Repository } from 'typeorm';
import { InjuryPhotoService } from './injury_photo.service';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';

describe('InjuryPhotoService', () => {
  let injuryPhotoRepository: Repository<Injury>;
  let service: InjuryPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [InjuryPhotoService],
    }).compile();

    service = module.get<InjuryPhotoService>(InjuryPhotoService);

    injuryPhotoRepository = module.get<Repository<Injury>>(
      getRepositoryToken(Injury),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
