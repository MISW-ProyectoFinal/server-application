import { Case } from './../../case/entities/case.entity';
import { Injury } from './../../injury/entities/injury.entity';
import { TreatmentProgress } from './../../treatment_progress/entities/treatment_progress.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    default: new Date(),
  })
  start_date: string;

  @Column({
    type: 'date',
    default: null,
  })
  end_date: string;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @ManyToOne(() => Injury, (injury) => injury.treatments)
  injury: Injury;

  @ManyToOne(() => Case, (caso) => caso.treatments)
  caso: Case;

  @OneToMany(
    () => TreatmentProgress,
    (treatment_progress) => treatment_progress.treatment,
  )
  treatment_progresses: TreatmentProgress[];
}
