import { Controller } from '@nestjs/common';
import { AllergyIllnessService } from './allergy_illness.service';

@Controller('allergy-illness')
export class AllergyIllnessController {
  constructor(private readonly allergyIllnessService: AllergyIllnessService) {}
}
