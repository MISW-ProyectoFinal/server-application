import { Module } from '@nestjs/common';
import { SpecificationIllnessService } from './specification_illness.service';
import { SpecificationIllnessController } from './specification_illness.controller';

@Module({
  controllers: [SpecificationIllnessController],
  providers: [SpecificationIllnessService],
})
export class SpecificationIllnessModule {}
