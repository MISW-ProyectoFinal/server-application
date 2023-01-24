import { TreatmentProgress } from 'src/treatment_progress/entities/treatment_progress.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TreatmentProgressPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: '',
  })
  url: string;

  @Column({
    type: 'date',
  })
  creation_date: Date;

  @ManyToOne(
    () => TreatmentProgress,
    (treatment_progress) => treatment_progress.treatment_progress_photos,
  )
  treatment_progress: TreatmentProgress;
}
