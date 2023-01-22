import { Test, TestingModule } from '@nestjs/testing';
import { InjuryService } from './injury.service';

describe('InjuryService', () => {
  let service: InjuryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InjuryService],
    }).compile();

    service = module.get<InjuryService>(InjuryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
