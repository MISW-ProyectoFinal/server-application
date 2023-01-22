import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationAllergyController } from './specification_allergy.controller';
import { SpecificationAllergyService } from './specification_allergy.service';

describe('SpecificationAllergyController', () => {
  let controller: SpecificationAllergyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationAllergyController],
      providers: [SpecificationAllergyService],
    }).compile();

    controller = module.get<SpecificationAllergyController>(SpecificationAllergyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
