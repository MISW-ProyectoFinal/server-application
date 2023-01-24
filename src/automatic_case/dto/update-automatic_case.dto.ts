import { PartialType } from '@nestjs/mapped-types';
import { CreateAutomaticCaseDto } from './create-automatic_case.dto';

export class UpdateAutomaticCaseDto extends PartialType(CreateAutomaticCaseDto) {}
