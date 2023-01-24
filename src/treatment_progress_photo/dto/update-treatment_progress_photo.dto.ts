import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentProgressPhotoDto } from './create-treatment_progress_photo.dto';

export class UpdateTreatmentProgressPhotoDto extends PartialType(CreateTreatmentProgressPhotoDto) {}
