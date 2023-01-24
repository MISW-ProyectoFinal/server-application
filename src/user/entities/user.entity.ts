import { CityEntity } from 'src/city/entities/city.entity';
import { CountryEntity } from 'src/country/entities/country.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class UserEntity {
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

  @ManyToOne(() => CityEntity, (city) => city.users)
  city: CityEntity;

  @ManyToOne(() => CountryEntity, (country) => country.users)
  country: CountryEntity;
}
