import { Test, TestingModule } from '@nestjs/testing';
import { SymptomInjuryController } from './symptom_injury.controller';
import { SymptomInjuryService } from './symptom_injury.service';

describe('SymptomInjuryController', () => {
  let controller: SymptomInjuryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymptomInjuryController],
      providers: [SymptomInjuryService],
    }).compile();

    controller = module.get<SymptomInjuryController>(SymptomInjuryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
