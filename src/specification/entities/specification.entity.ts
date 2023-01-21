import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DetailType } from 'src/detail_type/detail_type.enum';
import { Specialty } from 'src/specialty/entities/specialty.entity';

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
  detailType: DetailType;

  @ManyToOne(() => Specialty, (specialty) => specialty.specifications)
  specialty: Specialty;
}
