import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AutomaticCase } from './../../automatic_case/entities/automatic_case.entity';
import { Case } from './../../case/entities/case.entity';
import { InjuryPhoto } from './../../injury_photo/entities/injury_photo.entity';
import { Symptom } from './../../symptom/entities/symptom.entity';
import { Treatment } from './../../treatment/entities/treatment.entity';
import { InjuryDistribution } from './../../injury_distribution/injury_distribution.enum';
import { InjuryShape } from './../../injury_shape/injury_shape.enum';
import { InjuryType } from './../../injury_type/injury_type.enum';
import { Patient } from './../../patient/entities/patient.entity';

export class CreateInjuryDto {
  @IsEnum(InjuryType)
  @IsNotEmpty()
  type: string;

  @IsEnum(InjuryShape)
  @IsNotEmpty()
  shape: string;

  @IsNotEmpty()
  number: number;

  @IsEnum(InjuryDistribution)
  @IsNotEmpty()
  distribution: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  patient: Patient;
  photos: InjuryPhoto[];
  symptoms: Symptom[];
  cases: Case[];
  treatments: Treatment[];
  automatic_cases: AutomaticCase[];
}
