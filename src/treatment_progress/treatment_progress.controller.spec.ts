import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentProgressController } from './treatment_progress.controller';
import { TreatmentProgressService } from './treatment_progress.service';

describe('TreatmentProgressController', () => {
  let controller: TreatmentProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentProgressController],
      providers: [TreatmentProgressService],
    }).compile();

    controller = module.get<TreatmentProgressController>(TreatmentProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
