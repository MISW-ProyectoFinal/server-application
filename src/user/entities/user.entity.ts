import { City } from 'src/city/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';
import { DocumentType } from 'src/document_type/entities/document_type.entity'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  
} from 'typeorm';
import { Sex } from 'src/sex/sex.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({
    type: 'enum',
    enum: Sex,
  })
  sex: Sex;

  @ManyToOne(() => City, (city) => city.users)
  city: City;

  @ManyToOne(() => Country, (country) => country.users)
  country: Country;

  @ManyToOne(() => DocumentType, document_type => document_type.users)
  document_type: DocumentType;
}
