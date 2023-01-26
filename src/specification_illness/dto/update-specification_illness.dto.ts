import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificationIllnessDto } from './create-specification_illness.dto';

export class UpdateSpecificationIllnessDto extends PartialType(
  CreateSpecificationIllnessDto,
) {}
