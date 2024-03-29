import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsMobilePhone,
  IsEnum,
  Matches,
} from 'class-validator';
import { Gender } from '../../gender/gender.enum';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
    { message: 'Invalid password' },
  )
  password: string;

  @IsBoolean()
  active = true;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @IsString()
  @IsNotEmpty()
  cell_phone: string;

  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @IsString()
  @IsNotEmpty()
  document_type: string;

  @IsString()
  @IsNotEmpty()
  document_number: string;

  doctor_specialties: [];

  enabled_date: string;

  cases: [];
}
