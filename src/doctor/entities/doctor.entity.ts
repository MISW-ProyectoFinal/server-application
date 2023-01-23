import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Case } from 'src/case/entities/case.entity';
import { SpecialtyDoctor } from 'src/specialty_doctor/entities/specialty_doctor.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export default class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enabled: boolean;

  @Column({ type: 'date' })
  enabled_date: string;

  @OneToOne(() => User, (user) => user.doctor)
  user: User;

  @OneToMany(
    () => SpecialtyDoctor,
    (specialty_doctor) => specialty_doctor.doctor,
  )
  specialty_doctor: SpecialtyDoctor[];

  @OneToMany(() => Case, (caso) => caso.doctor)
  cases: Case[];
}
