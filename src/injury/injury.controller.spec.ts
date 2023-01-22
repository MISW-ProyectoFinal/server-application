import { Test, TestingModule } from '@nestjs/testing';
import { InjuryController } from './injury.controller';
import { InjuryService } from './injury.service';

describe('InjuryController', () => {
  let controller: InjuryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InjuryController],
      providers: [InjuryService],
    }).compile();

    controller = module.get<InjuryController>(InjuryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
