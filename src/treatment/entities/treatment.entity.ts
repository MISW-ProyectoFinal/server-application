import { Case } from 'src/case/entities/case.entity';
import { Injury } from 'src/injury/entities/injury.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Treatment {
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

  @ManyToOne(() => Injury, (injury) => injury.treatments)
  injury: Injury;

  @ManyToOne(() => Case, (caso) => caso.treatments)
  caso: Case;
}
