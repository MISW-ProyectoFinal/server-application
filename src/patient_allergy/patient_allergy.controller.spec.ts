import { Test, TestingModule } from '@nestjs/testing';
import { PatientAllergyController } from './patient_allergy.controller';
import { PatientAllergyService } from './patient_allergy.service';

describe('PatientAllergyController', () => {
  let controller: PatientAllergyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientAllergyController],
      providers: [PatientAllergyService],
    }).compile();

    controller = module.get<PatientAllergyController>(PatientAllergyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
