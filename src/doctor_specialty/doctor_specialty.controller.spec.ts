import { Test, TestingModule } from '@nestjs/testing';
import { DoctorSpecialtyController } from './doctor_specialty.controller';
import { DoctorSpecialtyService } from './doctor_specialty.service';

describe('DoctorSpecialtyController', () => {
  let controller: DoctorSpecialtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorSpecialtyController],
      providers: [DoctorSpecialtyService],
    }).compile();

    controller = module.get<DoctorSpecialtyController>(
      DoctorSpecialtyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
