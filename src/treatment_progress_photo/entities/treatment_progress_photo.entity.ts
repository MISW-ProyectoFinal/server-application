import { TreatmentProgressEntity } from 'src/treatment_progress/entities/treatment_progress.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TreatmentProgressPhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: '',
  })
  url: string;

  @Column({ type: 'date' })
  creation_date: string;

  @ManyToOne(
    () => TreatmentProgressEntity,
    (treatment_progress) => treatment_progress.treatment_progress_photos,
  )
  treatment_progress: TreatmentProgressEntity;
}
