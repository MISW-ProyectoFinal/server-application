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
import { PaymentModule } from './payment/payment.module';
import { CaseModule } from './case/case.module';
import { TreatmentModule } from './treatment/treatment.module';
import { InjuryPhotoModule } from './injury_photo/injury_photo.module';
import { AutomaticCaseModule } from './automatic_case/automatic_case.module';
import { AutomaticDiagnosisModule } from './automatic_diagnosis/automatic_diagnosis.module';
import { TreatmentProcessModule } from './treatment_process/treatment_process.module';
import { TreatmentProgressModule } from './treatment_progress/treatment_progress.module';
import { TreatmentProgressPhotoModule } from './treatment_progress_photo/treatment_progress_photo.module';

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
    PaymentModule,
    CaseModule,
    TreatmentModule,
    InjuryPhotoModule,
    AutomaticCaseModule,
    AutomaticDiagnosisModule,
    TreatmentProcessModule,
    TreatmentProgressModule,
    TreatmentProgressPhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
