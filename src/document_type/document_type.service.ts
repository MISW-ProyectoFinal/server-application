import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document_type.dto';
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

  findOne(id: number) {
    return `This action returns a #${id} documentType`;
  }

  update(id: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return `This action updates a #${id} documentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentType`;
  }
}
