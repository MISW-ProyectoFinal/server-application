import { Test, TestingModule } from '@nestjs/testing';
import { SymptomIllnessService } from './symptom_illness.service';

describe('SymptomIllnessService', () => {
  let service: SymptomIllnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymptomIllnessService],
    }).compile();

    service = module.get<SymptomIllnessService>(SymptomIllnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
