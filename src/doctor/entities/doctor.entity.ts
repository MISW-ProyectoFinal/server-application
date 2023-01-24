import { CaseEntity } from 'src/case/entities/case.entity';
import { DoctorSpecialtyEntity } from 'src/doctor_specialty/entities/doctor_specialty.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class DoctorEntity extends UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enabled: boolean;

  @Column({ type: 'date' })
  enabled_date: string;

  @OneToMany(() => DoctorSpecialtyEntity, doctor_specialty => doctor_specialty.doctor)
  doctor_specialties: DoctorSpecialtyEntity[];

  @OneToMany(() => CaseEntity, (caso) => caso.doctor)
  cases: CaseEntity[];
}
