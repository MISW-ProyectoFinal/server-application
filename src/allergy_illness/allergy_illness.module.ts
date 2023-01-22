import { Module } from '@nestjs/common';
import { AllergyIllnessService } from './allergy_illness.service';
import { AllergyIllnessController } from './allergy_illness.controller';

@Module({
  controllers: [AllergyIllnessController],
  providers: [AllergyIllnessService]
})
export class AllergyIllnessModule {}
