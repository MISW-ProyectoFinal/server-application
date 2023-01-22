import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyDoctorController } from './specialty_doctor.controller';
import { SpecialtyDoctorService } from './specialty_doctor.service';

describe('SpecialtyDoctorController', () => {
  let controller: SpecialtyDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialtyDoctorController],
      providers: [SpecialtyDoctorService],
    }).compile();

    controller = module.get<SpecialtyDoctorController>(SpecialtyDoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
