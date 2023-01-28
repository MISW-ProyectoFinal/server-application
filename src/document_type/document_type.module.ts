import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { DocumentTypeController } from './document_type.controller';
import { DocumentType } from './entities/document_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
  imports: [TypeOrmModule.forFeature([DocumentType])],
})
export class DocumentTypeModule {}
