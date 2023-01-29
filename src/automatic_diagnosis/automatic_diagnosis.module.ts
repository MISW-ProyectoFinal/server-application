import { Module } from '@nestjs/common';
import { AutomaticDiagnosisService } from './automatic_diagnosis.service';
import { AutomaticDiagnosisController } from './automatic_diagnosis.controller';

@Module({
  controllers: [AutomaticDiagnosisController],
  providers: [AutomaticDiagnosisService],
})
export class AutomaticDiagnosisModule {}
