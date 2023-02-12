import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { DocumentTypeService } from './document_type.service';
import { DocumentType } from './entities/document_type.entity';

describe('DocumentTypeService', () => {
  let service: DocumentTypeService;
  let repository: Repository<DocumentType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [DocumentTypeService],
    }).compile();

    service = module.get<DocumentTypeService>(DocumentTypeService);
    repository = module.get<Repository<DocumentType>>(
      getRepositoryToken(DocumentType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
