import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { DocumentTypeController } from './document_type.controller';

@Module({
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService]
})
export class DocumentTypeModule {}
