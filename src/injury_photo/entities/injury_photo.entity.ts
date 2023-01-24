import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Injury } from 'src/injury/entities/injury.entity';

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

  @Column({
    type: 'date',
    default: '',
  })
  upload_date: Date;

  @ManyToOne(() => Injury, (injury) => injury.photos)
  injury: Injury;
}
