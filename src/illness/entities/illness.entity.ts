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
export class Illness {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Specification, (specification) => specification.illnesses)
  @JoinTable()
  specifications: Specification[];

  @ManyToMany(() => Symptom, (symptom) => symptom.illnesses)
  @JoinTable()
  symptoms: Symptom[];

  @ManyToMany(() => Patient, (patient) => patient.allergies)
  @JoinTable()
  patients: Patient[];
}
