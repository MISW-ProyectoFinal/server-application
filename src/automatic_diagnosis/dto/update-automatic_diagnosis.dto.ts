import { PartialType } from '@nestjs/mapped-types';
import { CreateAutomaticDiagnosisDto } from './create-automatic_diagnosis.dto';

export class UpdateAutomaticDiagnosisDto extends PartialType(
  CreateAutomaticDiagnosisDto,
) {}
