import { Test, TestingModule } from '@nestjs/testing';
import { AllergyIllnessService } from './allergy_illness.service';

describe('AllergyIllnessService', () => {
  let service: AllergyIllnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllergyIllnessService],
    }).compile();

    service = module.get<AllergyIllnessService>(AllergyIllnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
