import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { InjuryTypes } from './../../injury_type/injury_typr.enum';
import { Shapes } from './../../shape/shapes.enum';
import { Distribution } from './../../distribution/distribution.enum';
import { Symptom } from './../../symptom/entities/symptom.entity';
import { Case } from './../../case/entities/case.entity';
import { Treatment } from './../../treatment/entities/treatment.entity';
import { InjuryPhoto } from './../../injury_photo/entities/injury_photo.entity';
import { AutomaticCase } from './../../automatic_case/entities/automatic_case.entity';

@ObjectType()
@Entity()
export class Injury {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: InjuryTypes,
    default: InjuryTypes.AMPOLLA,
  })
  injury_type: InjuryTypes;

  @Column({
    type: 'enum',
    enum: Shapes,
    default: Shapes.ANILLO,
  })
  shapes: Shapes;

  @Column({
    type: 'numeric',
    default: 0,
  })
  injuryNUmber: number;

  @Column({
    type: 'enum',
    enum: Distribution,
    default: Distribution.ASIMETRICA,
  })
  distribution: Distribution;

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
}
