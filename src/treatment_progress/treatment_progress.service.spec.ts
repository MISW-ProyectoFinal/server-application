import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentProgressService } from './treatment_progress.service';

describe('TreatmentProgressService', () => {
  let service: TreatmentProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentProgressService],
    }).compile();

    service = module.get<TreatmentProgressService>(TreatmentProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
