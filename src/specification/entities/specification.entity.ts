import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DetailType } from 'src/detail_type/detail_type.enum';
import { Specialty } from 'src/specialty/entities/specialty.entity';
import { Allergy } from 'src/allergy/entities/allergy.entity';
import { Illness } from 'src/illness/entities/illness.entity';

@ObjectType()
@Entity()
export class Specification {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DetailType,
    default: DetailType.DETAIL1,
  })
  detail_type: DetailType;

  @ManyToOne(() => Specialty, (specialty) => specialty.specifications)
  specialty: Specialty;

  @ManyToMany(() => Allergy, (allergy) => allergy.specifications)
  @JoinTable()
  allergies: Allergy[];

  @ManyToMany(() => Illness, (illness) => illness.specifications)
  @JoinTable()
  illnesses: Illness[];
}
