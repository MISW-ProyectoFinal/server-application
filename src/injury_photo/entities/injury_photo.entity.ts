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
  url: string;

  @Column({ type: 'date' })
  upload_date: string;

  @ManyToOne(() => Injury, (injury) => injury.photos)
  injury: Injury;
}
