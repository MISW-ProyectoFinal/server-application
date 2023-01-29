import { City } from 'src/city/entities/city.entity';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from 'src/document_type/entities/document_type.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @OneToMany(() => User, (user) => user.country)
  users: User[];

  @OneToMany(() => DocumentType, (document_type) => document_type.country)
  document_types: DocumentType[];
}
