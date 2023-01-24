import { Test, TestingModule } from '@nestjs/testing';
import { AutomaticDiagnosisController } from './automatic_diagnosis.controller';
import { AutomaticDiagnosisService } from './automatic_diagnosis.service';

describe('AutomaticDiagnosisController', () => {
  let controller: AutomaticDiagnosisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomaticDiagnosisController],
      providers: [AutomaticDiagnosisService],
    }).compile();

    controller = module.get<AutomaticDiagnosisController>(AutomaticDiagnosisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
