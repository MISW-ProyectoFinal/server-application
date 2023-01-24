import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Injury } from 'src/injury/entities/injury.entity';
import { AutomaticDiagnosis } from 'src/automatic_diagnosis/entities/automatic_diagnosis.entity';

@ObjectType()
@Entity()
export class AutomaticCase {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
  })
  generated_date: Date;

  @ManyToOne(() => Injury, (injury) => injury.automatic_cases)
  injury: Injury;

  @OneToMany(
    () => AutomaticDiagnosis,
    (automaticDiagnosis) => automaticDiagnosis.automatic_case,
  )
  automatic_diagnoses: AutomaticDiagnosis[];
}
