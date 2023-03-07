import { Controller } from '@nestjs/common';
import { AutomaticDiagnosisService } from './automatic_diagnosis.service';

@Controller('automatic-diagnosis')
export class AutomaticDiagnosisController {
  constructor(
    private readonly automaticDiagnosisService: AutomaticDiagnosisService,
  ) {}
}
