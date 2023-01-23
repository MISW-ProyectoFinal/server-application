import Doctor from 'src/doctor/entities/doctor.entity';
import { Specialty } from 'src/specialty/entities/specialty.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class SpecialtyDoctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  emission_date: string;

  @Column({ type: 'date' })
  expiration_date: string;

  @Column()
  authorized: boolean;

  @Column()
  specialty_name: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.specialty_doctor)
  specialty: Specialty;

  @ManyToOne(() => Doctor, (doctor) => doctor.specialty_doctor)
  doctor: Doctor;
}
