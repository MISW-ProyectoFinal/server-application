import { IsBoolean, IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class CreateDoctorSpecialtyDto {
  @IsString()
  @IsNotEmpty()
  emission_date: string;

  expiration_date: string;

  file_name: string;

  @IsString()
  @IsNotEmpty()
  registry_number: string;
}
