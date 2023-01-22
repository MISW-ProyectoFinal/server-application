import { PartialType } from '@nestjs/mapped-types';
import { CreateAllergyIllnessDto } from './create-allergy_illness.dto';

export class UpdateAllergyIllnessDto extends PartialType(CreateAllergyIllnessDto) {}
