import { City } from './../../city/entities/city.entity';
import { Country } from './../../country/entities/country.entity';
import { DocumentType } from './../../document_type/entities/document_type.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sex } from './../../sex/sex.enum';
import { Language } from 'src/language/language.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  document_number: string;

  @Column({ nullable: true })
  cell_phone: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: string;

  @Column({ nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: true,
  })
  sex: Sex;

  @ManyToOne(() => City, (city) => city.users)
  city: City;

  @ManyToOne(() => Country, (country) => country.users)
  country: Country;

  @ManyToOne(() => DocumentType, (document_type) => document_type.users)
  document_type: DocumentType;

  @ManyToOne(() => Country, (fav_country) => fav_country.users)
  virt_country: Country;

  @ManyToOne(() => City, (fav_city) => fav_city.users)
  virt_city: City;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.SPANISH,
  })
  fav_language: Language;
}
