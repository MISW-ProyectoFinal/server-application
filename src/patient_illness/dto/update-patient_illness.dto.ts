import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientIllnessDto } from './create-patient_illness.dto';

export class UpdatePatientIllnessDto extends PartialType(
  CreatePatientIllnessDto,
) {}
