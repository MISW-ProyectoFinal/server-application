import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { AllergyEntity } from 'src/allergy/entities/allergy.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IllnessEntity } from 'src/illness/entities/illness.entity';
import { SkynTypes } from 'src/skin_type/skin_type.enum';

@Entity()
export class PatientEntity extends UserEntity {
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

  @ManyToMany(() => AllergyEntity, (allergy) => allergy.patients)
  @JoinTable()
  allergies: AllergyEntity[];

  @ManyToMany(() => IllnessEntity, (illness) => illness.patients)
  @JoinTable()
  illnesses: IllnessEntity[];
}
