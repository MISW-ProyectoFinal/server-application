import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentProgress } from './../treatment_progress/entities/treatment_progress.entity';
import { TreatmentProgressPhoto } from './entities/treatment_progress_photo.entity';
import { TreatmentProgressPhotoService } from './treatment_progress_photo.service';

@Module({
  providers: [TreatmentProgressPhotoService],
  imports: [
    TypeOrmModule.forFeature([TreatmentProgressPhoto, TreatmentProgress]),
  ],
})
export class TreatmentProgressPhotoModule {}
