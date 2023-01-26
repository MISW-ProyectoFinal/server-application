import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationAllergyService } from './specification_allergy.service';

describe('SpecificationAllergyService', () => {
  let service: SpecificationAllergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificationAllergyService],
    }).compile();

    service = module.get<SpecificationAllergyService>(
      SpecificationAllergyService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
