import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module';
import { AllergyModule } from './allergy/allergy.module';
import { IllnessModule } from './illness/illness.module';
import { SymptomModule } from './symptom/symptom.module';
import { SpecificationModule } from './specification/specification.module';

@Module({
  imports: [
    SpecialtyModule,
    AllergyModule,
    IllnessModule,
    SymptomModule,
    SpecificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
