import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { InjuryEntity } from 'src/injury/entities/injury.entity';

@ObjectType()
@Entity()
export class InjuryPhotoEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  url: string;

  @Column({ type: 'date'})
  upload_date: string;

  @ManyToOne(() => InjuryEntity, (injury) => injury.photos)
  injury: InjuryEntity;
}
