import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientAllergyDto } from './create-patient_allergy.dto';

export class UpdatePatientAllergyDto extends PartialType(
  CreatePatientAllergyDto,
) {}
