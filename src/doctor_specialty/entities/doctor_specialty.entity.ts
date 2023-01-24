import { DoctorEntity } from 'src/doctor/entities/doctor.entity';
import { SpecialtyEntity } from 'src/specialty/entities/specialty.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DoctorSpecialtyEntity {
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

  @ManyToOne(() => SpecialtyEntity, (specialty) => specialty.doctor_specialties)
  specialty: SpecialtyEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.doctor_specialties)
  doctor: DoctorEntity;
}
