import { Test, TestingModule } from '@nestjs/testing';
import { SymptomIllnessController } from './symptom_illness.controller';
import { SymptomIllnessService } from './symptom_illness.service';

describe('SymptomIllnessController', () => {
  let controller: SymptomIllnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymptomIllnessController],
      providers: [SymptomIllnessService],
    }).compile();

    controller = module.get<SymptomIllnessController>(SymptomIllnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
