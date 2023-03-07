import { Controller } from '@nestjs/common';
import { SpecificationIllnessService } from './specification_illness.service';

@Controller('specification-illness')
export class SpecificationIllnessController {
  constructor(
    private readonly specificationIllnessService: SpecificationIllnessService,
  ) {}
}
