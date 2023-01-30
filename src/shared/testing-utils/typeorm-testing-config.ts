import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../../country/entities/country.entity';
import { City } from '../../city/entities/city.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { DocumentType } from '../../document_type/entities/document_type.entity';
import { User } from '../../user/entities/user.entity';
import { DoctorSpecialty } from '../../doctor_specialty/entities/doctor_specialty.entity';
import { Specialty } from '../../specialty/entities/specialty.entity';
import { Specification } from '../../specification/entities/specification.entity';
import { Allergy } from '../../allergy/entities/allergy.entity';
import { Illness } from '../../illness/entities/illness.entity';
import { Symptom } from '../../symptom/entities/symptom.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { Injury } from '../../injury/entities/injury.entity';
import { Case } from '../../case/entities/case.entity';
import { Treatment } from '../../treatment/entities/treatment.entity';
import { TreatmentProgress } from '../../treatment_progress/entities/treatment_progress.entity';
import { TreatmentProgressPhoto } from '../../treatment_progress_photo/entities/treatment_progress_photo.entity';
import { InjuryPhoto } from '../../injury_photo/entities/injury_photo.entity';
import { AutomaticCase } from '../../automatic_case/entities/automatic_case.entity';
import { AutomaticDiagnosis } from '../../automatic_diagnosis/entities/automatic_diagnosis.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'testing_db',
    username: process.env['PG_DB_USERNAME'] || 'postgres',
    password: process.env['PG_DB_PASSWORD'] || 'postgres',
    dropSchema: false,
    entities: [
      Doctor,
      City,
      Country,
      DocumentType,
      User,
      DoctorSpecialty,
      Specialty,
      Specification,
      Allergy,
      Illness,
      Symptom,
      Patient,
      Injury,
      Case,
      Treatment,
      TreatmentProgress,
      TreatmentProgressPhoto,
      InjuryPhoto,
      AutomaticCase,
      AutomaticDiagnosis,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([Doctor]),
];
