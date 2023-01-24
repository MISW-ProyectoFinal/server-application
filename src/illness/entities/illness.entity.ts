import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SpecificationEntity } from 'src/specification/entities/specification.entity';
import { SymptomEntity } from 'src/symptom/entities/symptom.entity';
import { PatientEntity } from 'src/patient/entities/patient.entity';

@ObjectType()
@Entity()
export class IllnessEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => SpecificationEntity, (specification) => specification.illnesses)
  @JoinTable()
  specifications: SpecificationEntity[];

  @ManyToMany(() => SymptomEntity, (symptom) => symptom.illnesses)
  @JoinTable()
  symptoms: SymptomEntity[];

  @ManyToMany(() => PatientEntity, (patient) => patient.allergies)
  @JoinTable()
  patients: PatientEntity[];
}
