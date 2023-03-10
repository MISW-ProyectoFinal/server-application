import { Controller } from '@nestjs/common';
import { SpecificationAllergyService } from './specification_allergy.service';

@Controller('specification-allergy')
export class SpecificationAllergyController {
  constructor(
    private readonly specificationAllergyService: SpecificationAllergyService,
  ) {}
}
