import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Injury } from './../../injury/entities/injury.entity';
import { AutomaticDiagnosis } from './../../automatic_diagnosis/entities/automatic_diagnosis.entity';
import { CaseStatus } from './../../case_status/case_status.enum';

@ObjectType()
@Entity()
export class AutomaticCase {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CaseStatus,
    default: CaseStatus.PENDIENTE,
  })
  case_status: CaseStatus;

  @Column({
    type: 'date',
    default: new Date(),
  })
  generated_date: string;

  @ManyToOne(() => Injury, (injury) => injury.automatic_cases)
  injury: Injury;

  @OneToMany(
    () => AutomaticDiagnosis,
    (automatic_diagnosis) => automatic_diagnosis.automatic_case,
  )
  automatic_diagnoses: AutomaticDiagnosis[];
}
