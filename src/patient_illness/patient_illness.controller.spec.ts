import { Test, TestingModule } from '@nestjs/testing';
import { PatientIllnessController } from './patient_illness.controller';
import { PatientIllnessService } from './patient_illness.service';

describe('PatientIllnessController', () => {
  let controller: PatientIllnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientIllnessController],
      providers: [PatientIllnessService],
    }).compile();

    controller = module.get<PatientIllnessController>(PatientIllnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
