import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Allergy } from './../../allergy/entities/allergy.entity';
import { Illness } from './../../illness/entities/illness.entity';
import { Injury } from './../../injury/entities/injury.entity';

@ObjectType()
@Entity()
export class Symptom {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Allergy, (allergy) => allergy.symptoms)
  @JoinTable()
  allergies: Allergy[];

  @ManyToMany(() => Illness, (illness) => illness.symptoms)
  @JoinTable()
  illnesses: Illness[];

  @ManyToMany(() => Injury, (injury) => injury.symptoms)
  @JoinTable()
  injuries: Injury[];
}
