import { TreatmentEntity } from 'src/treatment/entities/treatment.entity';
import { TreatmentProgressPhotoEntity } from 'src/treatment_progress_photo/entities/treatment_progress_photo.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class TreatmentProgressEntity {
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

  @ManyToOne(() => TreatmentEntity, (treatment) => treatment.treatment_progress)
  treatment: TreatmentEntity;

  @OneToMany(
    () => TreatmentProgressPhotoEntity,
    (treatment_progress_photo) => treatment_progress_photo.treatment_progress,
  )
  treatment_progress_photos: TreatmentProgressPhotoEntity[];
}
