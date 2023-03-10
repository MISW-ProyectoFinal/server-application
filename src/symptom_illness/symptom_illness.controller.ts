import { Controller } from '@nestjs/common';
import { SymptomIllnessService } from './symptom_illness.service';

@Controller('symptom-illness')
export class SymptomIllnessController {
  constructor(private readonly symptomIllnessService: SymptomIllnessService) {}
}
