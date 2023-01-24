import { Test, TestingModule } from '@nestjs/testing';
import { InjuryPhotoService } from './injury_photo.service';

describe('InjuryPhotoService', () => {
  let service: InjuryPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InjuryPhotoService],
    }).compile();

    service = module.get<InjuryPhotoService>(InjuryPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
