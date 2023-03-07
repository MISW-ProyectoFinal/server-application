import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { DocumentType } from './entities/document_type.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
  ) {}

  async create(createDocumentTypeDto: CreateDocumentTypeDto) {
    return await this.documentTypeRepository.save(createDocumentTypeDto);
  }

  async findAll() {
    return await this.documentTypeRepository.find();
  }
}
