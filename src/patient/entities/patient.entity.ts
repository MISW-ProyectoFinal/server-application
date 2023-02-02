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

  @Column({
    type: 'date',
    nullable: true,
  })
  approval_date: string;

  @Column({
    type: 'enum',
    enum: SkinType,
    default: SkinType.BLANCO,
    nullable: true,
  })
  skin_type: SkinType;

  @ManyToMany(() => Allergy, (allergy) => allergy.patients)
  @JoinTable()
  allergies: Allergy[];

  @ManyToMany(() => Illness, (illness) => illness.patients)
  @JoinTable()
  illnesses: Illness[];
}
