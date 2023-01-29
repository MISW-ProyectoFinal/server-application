import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentProgressPhotoService } from './treatment_progress_photo.service';

describe('TreatmentProgressPhotoService', () => {
  let service: TreatmentProgressPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentProgressPhotoService],
    }).compile();

    service = module.get<TreatmentProgressPhotoService>(
      TreatmentProgressPhotoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
