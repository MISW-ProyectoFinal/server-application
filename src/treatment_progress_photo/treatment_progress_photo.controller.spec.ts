import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentProgressPhotoController } from './treatment_progress_photo.controller';
import { TreatmentProgressPhotoService } from './treatment_progress_photo.service';

describe('TreatmentProgressPhotoController', () => {
  let controller: TreatmentProgressPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentProgressPhotoController],
      providers: [TreatmentProgressPhotoService],
    }).compile();

    controller = module.get<TreatmentProgressPhotoController>(
      TreatmentProgressPhotoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
