import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SkinType } from './../../skin_type/skin_type.enum';

export class CreatePatientDto {
  @IsBoolean()
  accept_terms = true;

  @IsString()
  @IsNotEmpty()
  approval_date: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SkinType)
  skyn_type: string;

  @IsString()
  skin_type_photo_url: string;
}
