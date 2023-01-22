import { Test, TestingModule } from '@nestjs/testing';
import { AllergyIllnessController } from './allergy_illness.controller';
import { AllergyIllnessService } from './allergy_illness.service';

describe('AllergyIllnessController', () => {
  let controller: AllergyIllnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllergyIllnessController],
      providers: [AllergyIllnessService],
    }).compile();

    controller = module.get<AllergyIllnessController>(AllergyIllnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
