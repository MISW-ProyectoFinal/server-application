import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyModule } from './specialty/specialty.module';
import { AllergyModule } from './allergy/allergy.module';
import { IllnessModule } from './illness/illness.module';
import { SymptomModule } from './symptom/symptom.module';
import { SpecificationModule } from './specification/specification.module';
import { UsersModule } from './user/users.module';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { DoctorModule } from './doctor/doctor.module';
import { SpecificationAllergyModule } from './specification_allergy/specification_allergy.module';
import { SpecificationIllnessModule } from './specification_illness/specification_illness.module';
import { AllergyIllnessModule } from './allergy_illness/allergy_illness.module';
import { InjuryModule } from './injury/injury.module';
import { SymptomInjuryModule } from './symptom_injury/symptom_injury.module';
import { DoctorSpecialtyModule } from './doctor_specialty/doctor_specialty.module';
import { PatientModule } from './patient/patient.module';
import { PatientIllnessModule } from './patient_illness/patient_illness.module';
import { PatientAllergyModule } from './patient_allergy/patient_allergy.module';
import { CaseModule } from './case/case.module';
import { TreatmentModule } from './treatment/treatment.module';
import { InjuryPhotoModule } from './injury_photo/injury_photo.module';
import { AutomaticCaseModule } from './automatic_case/automatic_case.module';
import { AutomaticDiagnosisModule } from './automatic_diagnosis/automatic_diagnosis.module';
import { TreatmentProgressModule } from './treatment_progress/treatment_progress.module';
import { TreatmentProgressPhotoModule } from './treatment_progress_photo/treatment_progress_photo.module';
import { AllergyEntity } from './allergy/entities/allergy.entity';
import { AutomaticCaseEntity } from './automatic_case/entities/automatic_case.entity';
import { AutomaticDiagnosisEntity } from './automatic_diagnosis/entities/automatic_diagnosis.entity';
import { CaseEntity } from './case/entities/case.entity';
import { CityEntity } from './city/entities/city.entity';
import { CountryEntity } from './country/entities/country.entity';
import { DoctorEntity } from './doctor/entities/doctor.entity';
import { DoctorSpecialtyEntity } from './doctor_specialty/entities/doctor_specialty.entity';
import { IllnessEntity } from './illness/entities/illness.entity';
import { InjuryEntity } from './injury/entities/injury.entity';
import { InjuryPhotoEntity } from './injury_photo/entities/injury_photo.entity';
import { PatientEntity } from './patient/entities/patient.entity';
import { SpecialtyEntity } from './specialty/entities/specialty.entity';
import { SpecificationEntity } from './specification/entities/specification.entity';
import { SymptomEntity } from './symptom/entities/symptom.entity';
import { TreatmentEntity } from './treatment/entities/treatment.entity';
import { TreatmentProgressEntity } from './treatment_progress/entities/treatment_progress.entity';
import { TreatmentProgressPhotoEntity } from './treatment_progress_photo/entities/treatment_progress_photo.entity';
import { UserEntity } from './user/entities/user.entity';

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
    DoctorSpecialtyModule,
    PatientModule,
    PatientIllnessModule,
    PatientAllergyModule,
    CaseModule,
    TreatmentModule,
    InjuryPhotoModule,
    AutomaticCaseModule,
    AutomaticDiagnosisModule,
    TreatmentProgressModule,
    TreatmentProgressPhotoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dermo_app',
      entities: [
        AllergyEntity,
        AutomaticCaseEntity,
        AutomaticDiagnosisEntity,
        CaseEntity,
        CityEntity,
        CountryEntity,
        DoctorEntity,
        DoctorSpecialtyEntity,
        IllnessEntity,
        InjuryEntity,
        InjuryPhotoEntity,
        PatientEntity,
        SpecialtyEntity,
        SpecificationEntity,
        SymptomEntity,
        TreatmentEntity,
        TreatmentProgressEntity,
        TreatmentProgressPhotoEntity,
        UserEntity
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
