import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AllergyEntity } from 'src/allergy/entities/allergy.entity';
import { IllnessEntity } from 'src/illness/entities/illness.entity';
import { InjuryEntity } from 'src/injury/entities/injury.entity';

@ObjectType()
@Entity()
export class SymptomEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => AllergyEntity, (allergy) => allergy.symptoms)
  @JoinTable()
  allergies: AllergyEntity[];

  @ManyToMany(() => IllnessEntity, (illness) => illness.symptoms)
  @JoinTable()
  illnesses: IllnessEntity[];

  @ManyToMany(() => InjuryEntity, (injury) => injury.symptoms)
  @JoinTable()
  injuries: InjuryEntity[];
}
