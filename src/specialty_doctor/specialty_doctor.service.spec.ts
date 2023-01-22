import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyDoctorService } from './specialty_doctor.service';

describe('SpecialtyDoctorService', () => {
  let service: SpecialtyDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialtyDoctorService],
    }).compile();

    service = module.get<SpecialtyDoctorService>(SpecialtyDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
