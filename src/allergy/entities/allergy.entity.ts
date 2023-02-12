import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Specification } from './../../specification/entities/specification.entity';
import { Symptom } from './../../symptom/entities/symptom.entity';
import { Patient } from './../../patient/entities/patient.entity';

@ObjectType()
@Entity()
export class Allergy {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Specification, (specification) => specification.allergies)
  @JoinTable()
  specifications: Specification[];

  @ManyToMany(() => Symptom, (symptom) => symptom.allergies)
  @JoinTable()
  symptoms: Symptom[];

  @ManyToMany(() => Patient, (patient) => patient.allergies)
  patients: Patient[];
}
