import { SpecialtyDoctor } from 'src/specialty_doctor/entities/specialty_doctor.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn,OneToOne,OneToMany } from 'typeorm';

@Entity()
export class Doctor {

  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    enabled:boolean;

  @Column({ type: 'date' })
  enabled_date:string;

  @OneToOne(() => User, user => user.doctor)
  user: User;

  @OneToMany(() => SpecialtyDoctor, (specialty_doctor) => specialty_doctor.doctor)
  specialty_doctor: SpecialtyDoctor[];
}
