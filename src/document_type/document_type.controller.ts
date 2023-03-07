import { Controller, Get, Post, Body } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { CreateDocumentTypeDto } from './dto/create-document_type.dto';

@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypeService.create(createDocumentTypeDto);
  }

  @Get()
  async findAll() {
    return await this.documentTypeService.findAll();
  }
}
