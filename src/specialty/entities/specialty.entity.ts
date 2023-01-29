import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Specification } from 'src/specification/entities/specification.entity';
import { DoctorSpecialty } from 'src/doctor_specialty/entities/doctor_specialty.entity';

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

  @OneToMany(
    () => DoctorSpecialty,
    (doctor_specialty) => doctor_specialty.specialty,
  )
  doctor_specialties: DoctorSpecialty[];
}
