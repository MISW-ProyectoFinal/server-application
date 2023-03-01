import { TreatmentProgress } from './../../treatment_progress/entities/treatment_progress.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class TreatmentProgressPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: '',
  })
  file_name: string;

  @Column({
    type: 'date',
    default: new Date(),
  })
  creation_date: string;

  @ManyToOne(
    () => TreatmentProgress,
    (treatment_progress) => treatment_progress.treatment_progress_photos,
    { eager: true },
  )
  @JoinColumn()
  treatment_progress: TreatmentProgress;
}
