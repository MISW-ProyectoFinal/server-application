import { Test, TestingModule } from '@nestjs/testing';
import { SymptomController } from './symptom.controller';
import { SymptomService } from './symptom.service';

describe('SymptomController', () => {
  let controller: SymptomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymptomController],
      providers: [SymptomService],
    }).compile();

    controller = module.get<SymptomController>(SymptomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
