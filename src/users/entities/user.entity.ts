
import { City } from 'src/city/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity, PrimaryGeneratedColumn,OneToOne,JoinColumn,ManyToOne } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    active: boolean;

  @Column()
    name: string;

  @Column()
   surname: string;

  @Column()
    phone: string;

  @Column()
    cell_phone: string;

  @Column({ type: 'date' })
    date_of_birth: string;

  @Column()
    address: string;

  @OneToOne(() => Doctor, doctor => doctor.user)
  @JoinColumn()
    doctor: Doctor;

  @OneToOne(() => Patient, patient => patient.user)
  @JoinColumn()
  patient: Patient;

  @ManyToOne(() => City, city => city.users)
    city: City

  @ManyToOne(() => Country, country => country.users)
    country: Country

}
