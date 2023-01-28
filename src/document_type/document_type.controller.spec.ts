import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTypeController } from './document_type.controller';
import { DocumentTypeService } from './document_type.service';

describe('DocumentTypeController', () => {
  let controller: DocumentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentTypeController],
      providers: [DocumentTypeService],
    }).compile();

    controller = module.get<DocumentTypeController>(DocumentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
