import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialtyDoctorDto } from './create-specialty_doctor.dto';

export class UpdateSpecialtyDoctorDto extends PartialType(CreateSpecialtyDoctorDto) {}
