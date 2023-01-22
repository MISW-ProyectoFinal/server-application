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
import { SpecificationAllergyModule } from './specification_allergy/specification_allergy.module';
import { SpecificationIllnessModule } from './specification_illness/specification_illness.module';
import { AllergyIllnessModule } from './allergy_illness/allergy_illness.module';
import { InjuryModule } from './injury/injury.module';
import { SymptomInjuryModule } from './symptom_injury/symptom_injury.module';
import { SpecialtyDoctorModule } from './specialty_doctor/specialty_doctor.module';
import { PatientModule } from './patient/patient.module';
import { PatientIllnessModule } from './patient_illness/patient_illness.module';
import { PatientAllergyModule } from './patient_allergy/patient_allergy.module';

@Module({
  imports: [
    SpecialtyModule,
    AllergyModule,
    IllnessModule,
    SymptomModule,
    SpecificationModule,
    UsersModule,
    CityModule,
    CountryModule,
    DoctorModule,
    SpecificationAllergyModule,
    SpecificationIllnessModule,
    AllergyIllnessModule,
    InjuryModule,
    SymptomInjuryModule,
    SpecialtyDoctorModule,
    PatientModule,
    PatientIllnessModule,
    PatientAllergyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
