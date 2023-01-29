import { Module } from '@nestjs/common';
import { AutomaticCaseService } from './automatic_case.service';
import { AutomaticCaseController } from './automatic_case.controller';

@Module({
  controllers: [AutomaticCaseController],
  providers: [AutomaticCaseService],
})
export class AutomaticCaseModule {}
