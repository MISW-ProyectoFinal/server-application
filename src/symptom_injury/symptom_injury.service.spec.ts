import { Test, TestingModule } from '@nestjs/testing';
import { SymptomInjuryService } from './symptom_injury.service';

describe('SymptomInjuryService', () => {
  let service: SymptomInjuryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymptomInjuryService],
    }).compile();

    service = module.get<SymptomInjuryService>(SymptomInjuryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
