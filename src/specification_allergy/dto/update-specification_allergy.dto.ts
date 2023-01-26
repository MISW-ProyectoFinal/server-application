import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificationAllergyDto } from './create-specification_allergy.dto';

export class UpdateSpecificationAllergyDto extends PartialType(
  CreateSpecificationAllergyDto,
) {}
