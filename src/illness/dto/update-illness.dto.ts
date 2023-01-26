import { PartialType } from '@nestjs/mapped-types';
import { CreateIllnessDto } from './create-illness.dto';

export class UpdateIllnessDto extends PartialType(CreateIllnessDto) {}
