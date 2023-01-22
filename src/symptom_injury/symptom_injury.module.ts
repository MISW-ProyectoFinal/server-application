import { Module } from '@nestjs/common';
import { SymptomInjuryService } from './symptom_injury.service';
import { SymptomInjuryController } from './symptom_injury.controller';

@Module({
  controllers: [SymptomInjuryController],
  providers: [SymptomInjuryService],
})
export class SymptomInjuryModule {}
