import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { InjuryTypes } from 'src/injury_type/injury_typr.enum';
import { Shapes } from 'src/shape/shapes.enum';
import { Distribution } from 'src/distribution/distribution.enum';
import { Symptom } from 'src/symptom/entities/symptom.entity';

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
  injuryType: InjuryTypes;

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

  @ManyToMany(() => Symptom, (symptom) => symptom.illnesses)
  @JoinTable()
  symptoms: Symptom[];
}
