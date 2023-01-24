import { Test, TestingModule } from '@nestjs/testing';
import { AutomaticCaseService } from './automatic_case.service';

describe('AutomaticCaseService', () => {
  let service: AutomaticCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomaticCaseService],
    }).compile();

    service = module.get<AutomaticCaseService>(AutomaticCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
