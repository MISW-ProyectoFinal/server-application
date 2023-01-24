import { PartialType } from '@nestjs/mapped-types';
import { CreateInjuryPhotoDto } from './create-injury_photo.dto';

export class UpdateInjuryPhotoDto extends PartialType(CreateInjuryPhotoDto) {}
