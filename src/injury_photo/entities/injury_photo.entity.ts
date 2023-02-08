import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Injury } from './../../injury/entities/injury.entity';

@ObjectType()
@Entity()
export class InjuryPhoto {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  file_name: string;

  @Column({
    type: 'date',
    default: ('0' + new Date().getDate()).slice(-2),
  })
  upload_date: string;

  @ManyToOne(() => Injury, (injury) => injury.photos)
  injury: Injury;
}
