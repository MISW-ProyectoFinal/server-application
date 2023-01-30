import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Allergy } from './../../allergy/entities/allergy.entity';
import { User } from './../../user/entities/user.entity';
import { Illness } from './../../illness/entities/illness.entity';
import { SkynTypes } from './../../skin_type/skin_type.enum';

@Entity()
export class Patient extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accept_terms: boolean;

  @Column({ type: 'date' })
  enabled_date: string;

  @Column({
    type: 'enum',
    enum: SkynTypes,
    default: SkynTypes.BLANCO,
  })
  skyn_type: SkynTypes;

  @Column({
    type: 'varchar',
    default: '',
  })
  url_foto_tipo_piel: string;

  @ManyToMany(() => Allergy, (allergy) => allergy.patients)
  @JoinTable()
  allergies: Allergy[];

  @ManyToMany(() => Illness, (illness) => illness.patients)
  @JoinTable()
  illnesses: Illness[];
}
