import { Module } from '@nestjs/common';
import { TreatmentProgressPhotoService } from './treatment_progress_photo.service';
import { TreatmentProgressPhotoController } from './treatment_progress_photo.controller';

@Module({
  controllers: [TreatmentProgressPhotoController],
  providers: [TreatmentProgressPhotoService],
})
export class TreatmentProgressPhotoModule {}
