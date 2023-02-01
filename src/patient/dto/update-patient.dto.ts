import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsString()
  skin_type_photo_filename = '';
}
