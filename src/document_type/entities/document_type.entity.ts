import { Country } from 'src/country/entities/country.entity';
import { User } from 'src/user/entities/user.entity';
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
