import { CityEntity } from 'src/city/entities/city.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => CityEntity, (city) => city.country)
  cities: CityEntity[];

  @OneToMany(() => UserEntity, (user) => user.country)
  users: UserEntity[];
}
