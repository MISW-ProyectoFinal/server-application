import { Module } from '@nestjs/common';
import { TreatmentProgressService } from './treatment_progress.service';
import { TreatmentProgressController } from './treatment_progress.controller';

@Module({
  controllers: [TreatmentProgressController],
  providers: [TreatmentProgressService]
})
export class TreatmentProgressModule {}
