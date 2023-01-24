import { Treatment } from 'src/treatment/entities/treatment.entity';
import { TreatmentProgressPhoto } from 'src/treatment_progress_photo/entities/treatment_progress_photo.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class TreatmentProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: '',
  })
  comment: string;

  @Column({
    type: 'date',
  })
  creation_date: string;

  @ManyToOne(() => Treatment, (treatment) => treatment.treatment_progress)
  treatment: Treatment;

  @OneToMany(
    () => TreatmentProgressPhoto,
    (treatment_progress_photo) => treatment_progress_photo.treatment_progress,
  )
  treatment_progress_photos: TreatmentProgressPhoto[];
}
