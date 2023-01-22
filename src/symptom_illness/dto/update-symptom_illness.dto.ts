import { PartialType } from '@nestjs/mapped-types';
import { CreateSymptomIllnessDto } from './create-symptom_illness.dto';

export class UpdateSymptomIllnessDto extends PartialType(CreateSymptomIllnessDto) {}
