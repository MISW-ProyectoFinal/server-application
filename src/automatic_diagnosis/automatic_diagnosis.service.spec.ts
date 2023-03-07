import { Test, TestingModule } from '@nestjs/testing';
import { AutomaticDiagnosisService } from './automatic_diagnosis.service';

describe('AutomaticDiagnosisService', () => {
  let service: AutomaticDiagnosisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomaticDiagnosisService],
    }).compile();

    service = module.get<AutomaticDiagnosisService>(AutomaticDiagnosisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
