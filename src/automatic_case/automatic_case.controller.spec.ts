import { Test, TestingModule } from '@nestjs/testing';
import { AutomaticCaseController } from './automatic_case.controller';
import { AutomaticCaseService } from './automatic_case.service';

describe('AutomaticCaseController', () => {
  let controller: AutomaticCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomaticCaseController],
      providers: [AutomaticCaseService],
    }).compile();

    controller = module.get<AutomaticCaseController>(AutomaticCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
