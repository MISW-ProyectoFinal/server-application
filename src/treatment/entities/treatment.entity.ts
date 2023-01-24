import { CaseEntity } from 'src/case/entities/case.entity';
import { InjuryEntity } from 'src/injury/entities/injury.entity';
import { TreatmentProgressEntity } from 'src/treatment_progress/entities/treatment_progress.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class TreatmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
  })
  start_date: string;

  @Column({
    type: 'date',
  })
  end_date: string;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @ManyToOne(() => InjuryEntity, (injury) => injury.treatments)
  injury: InjuryEntity;

  @ManyToOne(() => CaseEntity, (caso) => caso.treatments)
  caso: CaseEntity;

  @OneToMany(
    () => TreatmentProgressEntity,
    (treatment_progress) => treatment_progress.treatment,
  )
  treatment_progress: TreatmentProgressEntity[];
}
