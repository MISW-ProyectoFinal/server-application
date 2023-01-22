import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Specification } from 'src/specification/entities/specification.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';

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
}
