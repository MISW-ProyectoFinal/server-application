import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Specification } from 'src/specification/entities/specification.entity';

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
}
