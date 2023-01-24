import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { InjuryEntity } from 'src/injury/entities/injury.entity';
import { AutomaticDiagnosisEntity } from 'src/automatic_diagnosis/entities/automatic_diagnosis.entity';

@ObjectType()
@Entity()
export class AutomaticCaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
  })
  generated_date: string;

  @ManyToOne(() => InjuryEntity, (injury) => injury.automatic_cases)
  injury: InjuryEntity;

  @OneToMany(() => AutomaticDiagnosisEntity, (automatic_diagnosis) => automatic_diagnosis.automatic_case)
  automatic_diagnoses: AutomaticDiagnosisEntity[];
}
