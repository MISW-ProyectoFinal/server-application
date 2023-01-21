import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module';
import { AllergyModule } from './allergy/allergy.module';
import { IllnessModule } from './illness/illness.module';
import { SymptomModule } from './symptom/symptom.module';
import { SpecificationModule } from './specification/specification.module';
import { UsersModule } from './users/users.module';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    SpecialtyModule,
    AllergyModule,
    IllnessModule,
    SymptomModule,
    SpecificationModule,
    UsersModule, CityModule, CountryModule, DoctorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
