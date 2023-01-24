import { Test, TestingModule } from '@nestjs/testing';
import { InjuryPhotoController } from './injury_photo.controller';
import { InjuryPhotoService } from './injury_photo.service';

describe('InjuryPhotoController', () => {
  let controller: InjuryPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InjuryPhotoController],
      providers: [InjuryPhotoService],
    }).compile();

    controller = module.get<InjuryPhotoController>(InjuryPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
