import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentProgressDto } from './create-treatment_progress.dto';

export class UpdateTreatmentProgressDto extends PartialType(
  CreateTreatmentProgressDto,
) {}
