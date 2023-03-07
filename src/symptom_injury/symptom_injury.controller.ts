import { Controller } from '@nestjs/common';
import { SymptomInjuryService } from './symptom_injury.service';

@Controller('symptom-injury')
export class SymptomInjuryController {
  constructor(private readonly symptomInjuryService: SymptomInjuryService) {}
}
