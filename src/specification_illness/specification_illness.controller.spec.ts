import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationIllnessController } from './specification_illness.controller';
import { SpecificationIllnessService } from './specification_illness.service';

describe('SpecificationIllnessController', () => {
  let controller: SpecificationIllnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationIllnessController],
      providers: [SpecificationIllnessService],
    }).compile();

    controller = module.get<SpecificationIllnessController>(
      SpecificationIllnessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
