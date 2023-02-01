import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Allergy } from './../../allergy/entities/allergy.entity';
import { User } from './../../user/entities/user.entity';
import { Illness } from './../../illness/entities/illness.entity';
import { SkinType } from './../../skin_type/skin_type.enum';

@Entity()
export class Patient extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  accept_terms: boolean;

  @Column({ type: 'date' })
  approval_date: string;

  @Column({
    type: 'enum',
    enum: SkinType,
    default: SkinType.BLANCO,
  })
  skyn_type: SkinType;

  @Column({
    type: 'varchar',
    default: '',
  })
  skin_type_photo_url: string;

  @ManyToMany(() => Allergy, (allergy) => allergy.patients)
  @JoinTable()
  allergies: Allergy[];

  @ManyToMany(() => Illness, (illness) => illness.patients)
  @JoinTable()
  illnesses: Illness[];
}
