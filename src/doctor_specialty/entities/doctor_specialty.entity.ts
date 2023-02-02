import { Doctor } from './../../doctor/entities/doctor.entity';
import { Specialty } from './../../specialty/entities/specialty.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DoctorSpecialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  emission_date: string;

  @Column({ type: 'date' })
  expiration_date: string;

  @Column()
  authorized: boolean;

  @Column({
    type: 'text',
    default: '',
  })
  file_name: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctor_specialties)
  specialty: Specialty;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctor_specialties)
  doctor: Doctor;
}
