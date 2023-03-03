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
import { Allergy } from './allergy/entities/allergy.entity';
import { AutomaticCase } from './automatic_case/entities/automatic_case.entity';
import { AutomaticDiagnosis } from './automatic_diagnosis/entities/automatic_diagnosis.entity';
import { Case } from './case/entities/case.entity';
import { City } from './city/entities/city.entity';
import { Country } from './country/entities/country.entity';
import { Doctor } from './doctor/entities/doctor.entity';
import { DoctorSpecialty } from './doctor_specialty/entities/doctor_specialty.entity';
import { Illness } from './illness/entities/illness.entity';
import { Injury } from './injury/entities/injury.entity';
import { InjuryPhoto } from './injury_photo/entities/injury_photo.entity';
import { Patient } from './patient/entities/patient.entity';
import { Specialty } from './specialty/entities/specialty.entity';
import { Specification } from './specification/entities/specification.entity';
import { Symptom } from './symptom/entities/symptom.entity';
import { Treatment } from './treatment/entities/treatment.entity';
import { TreatmentProgress } from './treatment_progress/entities/treatment_progress.entity';
import { TreatmentProgressPhoto } from './treatment_progress_photo/entities/treatment_progress_photo.entity';
import { User } from './user/entities/user.entity';
import { DocumentTypeModule } from './document_type/document_type.module';
import { DocumentType } from './document_type/entities/document_type.entity';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { SkinTypeModule } from './skin_type/skin_type.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SkinTypeModule,
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
    DocumentTypeModule,
    MulterModule.registerAsync({ useFactory: () => ({ dest: './uploads' }) }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['PG_DB_HOSTURL'] || 'localhost',
      port: +process.env['PG_DB_PORT'] || 5432,
      username: process.env['PG_DB_USERNAME'] || 'postgres',
      password: process.env['PG_DB_PASSWORD'] || 'postgres',
      database: process.env['PG_DB_NAME'] || 'dermo_app',
      entities: [
        Allergy,
        AutomaticCase,
        AutomaticDiagnosis,
        Case,
        City,
        Country,
        Doctor,
        DoctorSpecialty,
        DocumentType,
        Illness,
        Injury,
        InjuryPhoto,
        Patient,
        Specialty,
        Specification,
        Symptom,
        Treatment,
        TreatmentProgress,
        TreatmentProgressPhoto,
        User,
        Notification,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    DocumentTypeModule,
    AuthModule,
    ConfigModule.forRoot(),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
