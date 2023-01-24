import { CountryEntity } from 'src/country/entities/country.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CountryEntity, (country) => country.cities)
  country: CountryEntity;

  @OneToMany(() => UserEntity, (users) => users.city)
  users: UserEntity[];
}
