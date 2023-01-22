import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationIllnessService } from './specification_illness.service';

describe('SpecificationIllnessService', () => {
  let service: SpecificationIllnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificationIllnessService],
    }).compile();

    service = module.get<SpecificationIllnessService>(
      SpecificationIllnessService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
