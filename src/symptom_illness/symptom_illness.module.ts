import { Module } from '@nestjs/common';
import { SymptomIllnessService } from './symptom_illness.service';
import { SymptomIllnessController } from './symptom_illness.controller';

@Module({
  controllers: [SymptomIllnessController],
  providers: [SymptomIllnessService],
})
export class SymptomIllnessModule {}
