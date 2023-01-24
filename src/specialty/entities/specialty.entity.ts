import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SpecificationEntity } from 'src/specification/entities/specification.entity';
import { DoctorSpecialtyEntity } from 'src/doctor_specialty/entities/doctor_specialty.entity';

@ObjectType()
@Entity()
export class SpecialtyEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => SpecificationEntity, specification => specification.specialty)
  specifications: SpecificationEntity[];

  @OneToMany(() => DoctorSpecialtyEntity, doctor_specialty => doctor_specialty.specialty)
  doctor_specialties: DoctorSpecialtyEntity[];
}
