import { PartialType } from '@nestjs/mapped-types';
import { CreateSymptomInjuryDto } from './create-symptom_injury.dto';

export class UpdateSymptomInjuryDto extends PartialType(
  CreateSymptomInjuryDto,
) {}
