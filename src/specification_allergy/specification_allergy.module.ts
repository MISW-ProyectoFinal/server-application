import { Module } from '@nestjs/common';
import { SpecificationAllergyService } from './specification_allergy.service';
import { SpecificationAllergyController } from './specification_allergy.controller';

@Module({
  controllers: [SpecificationAllergyController],
  providers: [SpecificationAllergyService],
})
export class SpecificationAllergyModule {}
