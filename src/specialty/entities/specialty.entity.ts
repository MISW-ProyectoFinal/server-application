import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Specification } from 'src/specification/entities/specification.entity';
import { SpecialtyDoctor } from 'src/specialty_doctor/entities/specialty_doctor.entity';

@ObjectType()
@Entity()
export class Specialty {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Specification, (specification) => specification.specialty)
  specifications: Specification[];

  @OneToMany(() => SpecialtyDoctor, (specialty_doctor) => specialty_doctor.specialty)
  specialty_doctor: SpecialtyDoctor[];

}
