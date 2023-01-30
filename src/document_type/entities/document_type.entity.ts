import { Country } from './../../country/entities/country.entity';
import { User } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @ManyToOne(() => Country, (country) => country.document_types)
  country: Country;

  @OneToMany(() => User, (users) => users.document_type)
  users: User[];
}
