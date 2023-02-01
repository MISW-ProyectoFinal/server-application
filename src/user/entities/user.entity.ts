import { City } from './../../city/entities/city.entity';
import { Country } from './../../country/entities/country.entity';
import { DocumentType } from './../../document_type/entities/document_type.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sex } from './../../sex/sex.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
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
  document_number: string;

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

  @ManyToOne(() => DocumentType, (document_type) => document_type.users)
  document_type: DocumentType;
}
