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
import { SpecialtyEntity } from 'src/specialty/entities/specialty.entity';
import { AllergyEntity } from 'src/allergy/entities/allergy.entity';
import { IllnessEntity } from 'src/illness/entities/illness.entity';

@ObjectType()
@Entity()
export class SpecificationEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DetailType,
    default: DetailType.DETAIL1,
  })
  detail_type: DetailType;

  @ManyToOne(() => SpecialtyEntity, (specialty) => specialty.specifications)
  specialty: SpecialtyEntity;

  @ManyToMany(() => AllergyEntity, (allergy) => allergy.specifications)
  @JoinTable()
  allergies: AllergyEntity[];

  @ManyToMany(() => IllnessEntity, (illness) => illness.specifications)
  @JoinTable()
  illnesses: IllnessEntity[];
}
