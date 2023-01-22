import { Module } from '@nestjs/common';
import { InjuryService } from './injury.service';
import { InjuryController } from './injury.controller';

@Module({
  controllers: [InjuryController],
  providers: [InjuryService]
})
export class InjuryModule {}
