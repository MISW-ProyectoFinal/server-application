import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Allergy } from 'src/allergy/entities/allergy.entity';
import { User } from 'src/users/entities/user.entity';
import { Illness } from 'src/illness/entities/illness.entity';
import { SkynTypes } from 'src/skin_type/skin_type.enum';

@Entity()
export class Patient {
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

  @OneToOne(() => User, (user) => user.patient)
  user: User;

  @ManyToMany(() => Allergy, (allergy) => allergy.patients)
  @JoinTable()
  allergies: Allergy[];

  @ManyToMany(() => Illness, (illness) => illness.patients)
  @JoinTable()
  illnesses: Illness[];
}
