import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AutomaticCaseEntity } from 'src/automatic_case/entities/automatic_case.entity';

@ObjectType()
@Entity()
export class AutomaticDiagnosisEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: '',
  })
  descriptionDiagnosis: string;

  @Column({
    type: 'float',
    default: 0,
  })
  accuracy: number;

  @Column({
    type: 'text',
    default: '',
  })
  descriptionTreatment: string;

  @Column({
    type: 'date',
  })
  start_date: string;

  @Column({
    type: 'date',
  })
  end_date: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  selected: boolean;

  @ManyToOne(
    () => AutomaticCaseEntity,
    (automaticCase) => automaticCase.automatic_diagnoses,
  )
  automatic_case: AutomaticCaseEntity;
}
