import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})',
  )
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  accept_terms: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
