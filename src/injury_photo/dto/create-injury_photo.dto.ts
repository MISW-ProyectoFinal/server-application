import { IsString } from 'class-validator';
import { Injury } from './../../injury/entities/injury.entity';

export class CreateInjuryPhotoDto {
  @IsString()
  file_name: string;

  injury: Injury;
}
