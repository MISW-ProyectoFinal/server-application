import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecificationIllnessService } from './specification_illness.service';

@Controller('specification-illness')
export class SpecificationIllnessController {
  constructor(
    private readonly specificationIllnessService: SpecificationIllnessService,
  ) {}
}
