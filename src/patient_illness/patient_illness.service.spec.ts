import { Test, TestingModule } from '@nestjs/testing';
import { PatientIllnessService } from './patient_illness.service';

describe('PatientIllnessService', () => {
  let service: PatientIllnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientIllnessService],
    }).compile();

    service = module.get<PatientIllnessService>(PatientIllnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
