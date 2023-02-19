import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateDoctorSpecialtyDto } from './create-doctor_specialty.dto';

export class UpdateDoctorSpecialtyDto extends PartialType(
  CreateDoctorSpecialtyDto,
) {
  @IsBoolean()
  @IsNotEmpty()
  authorized: boolean;
}
