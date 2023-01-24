import { CaseEntity } from 'src/case/entities/case.entity';
import { InjuryEntity } from 'src/injury/entities/injury.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TreatmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
  })
  start_date: Date;

  @Column({
    type: 'date',
  })
  end_date: Date;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @ManyToOne(() => InjuryEntity, (injury) => injury.treatments)
  injury: InjuryEntity;

  @ManyToOne(() => CaseEntity, (caso) => caso.treatments)
  caso: CaseEntity;
}
