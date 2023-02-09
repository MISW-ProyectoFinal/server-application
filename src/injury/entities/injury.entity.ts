import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { InjuryType } from '../../injury_type/injury_type.enum';
import { InjuryShape } from './../../injury_shape/injury_shape.enum';
import { InjuryDistribution } from './../../injury_distribution/injury_distribution.enum';
import { Symptom } from './../../symptom/entities/symptom.entity';
import { Case } from './../../case/entities/case.entity';
import { Treatment } from './../../treatment/entities/treatment.entity';
import { InjuryPhoto } from './../../injury_photo/entities/injury_photo.entity';
import { AutomaticCase } from './../../automatic_case/entities/automatic_case.entity';
import { Patient } from './../../patient/entities/patient.entity';

@ObjectType()
@Entity()
export class Injury {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: InjuryType,
    default: InjuryType.AMPOLLA,
  })
  type: InjuryType;

  @Column({
    type: 'enum',
    enum: InjuryShape,
    default: InjuryShape.ANILLO,
  })
  shape: InjuryShape;

  @Column({
    type: 'numeric',
    default: 0,
  })
  number: number;

  @Column({
    type: 'enum',
    enum: InjuryDistribution,
    default: InjuryDistribution.ASIMETRICA,
  })
  distribution: InjuryDistribution;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  color: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  location: string;

  @ManyToMany(() => Symptom, (symptom) => symptom.injuries)
  @JoinTable()
  symptoms: Symptom[];

  @OneToMany(() => Case, (caso) => caso.injury)
  cases: Case[];

  @OneToMany(() => Treatment, (treatment) => treatment.injury)
  treatments: Treatment[];

  @OneToMany(() => InjuryPhoto, (injuryPhoto) => injuryPhoto.injury)
  photos: InjuryPhoto[];

  @OneToMany(() => AutomaticCase, (automaticCase) => automaticCase.injury)
  automatic_cases: AutomaticCase[];

  @ManyToOne(() => Patient, (patient) => patient.injuries)
  patient: Patient;
}
