import { Case } from './../../case/entities/case.entity';
import { DoctorSpecialty } from './../../doctor_specialty/entities/doctor_specialty.entity';
import { User } from './../../user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Doctor extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: false,
  })
  enabled: boolean;

  @Column({
    nullable: true,
    type: 'date',
  })
  enabled_date: string;

  @OneToMany(
    () => DoctorSpecialty,
    (doctor_specialty) => doctor_specialty.doctor,
  )
  doctor_specialties: DoctorSpecialty[];

  @OneToMany(() => Case, (caso) => caso.doctor)
  cases: Case[];
}
