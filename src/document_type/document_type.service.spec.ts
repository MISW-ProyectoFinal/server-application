import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from './../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { DocumentTypeService } from './document_type.service';
import { DocumentType } from './entities/document_type.entity';
import { Country } from './../country/entities/country.entity';
import { faker } from '@faker-js/faker';

describe('DocumentTypeService', () => {
  let documentTypeService: DocumentTypeService;

  let documentTypeRepository: Repository<DocumentType>;
  let countryRepository: Repository<Country>;

  let country1: Country;
  let documentType1: DocumentType;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: TypeOrmTestingConfig(),
      providers: [DocumentTypeService],
    }).compile();

    documentTypeService = module.get<DocumentTypeService>(DocumentTypeService);

    documentTypeRepository = module.get<Repository<DocumentType>>(
      getRepositoryToken(DocumentType),
    );
    countryRepository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await documentTypeRepository.delete({});
    await countryRepository.delete({});

    country1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      cities: [],
      users: [],
      virt_users: [],
      document_types: [],
    };
    await countryRepository.save(country1);

    documentType1 = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      abbreviation: faker.name.firstName(),
      users: [],
      country: country1,
    };
    await documentTypeRepository.save(documentType1);
  };

  it('should be defined', () => {
    expect(documentTypeService).toBeDefined();
  });

  it('should create a document type', async () => {
    const documentType2 = {
      ...documentType1,
      ...{
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        abbreviation: faker.name.firstName(),
      },
    };

    const createdDocumentType: DocumentType = await documentTypeService.create(
      documentType2,
    );
    expect(createdDocumentType).not.toBeNull();
    expect(createdDocumentType.name).toEqual(documentType2.name);
  });

  it('should list all document types', async () => {
    const documentTypes: DocumentType[] = await documentTypeService.findAll();
    expect(documentTypes).not.toBeNull();
    expect(documentTypes.length).toEqual(1);
  });
});
