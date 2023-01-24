import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { InjuryTypes } from 'src/injury_type/injury_typr.enum';
import { Shapes } from 'src/shape/shapes.enum';
import { Distribution } from 'src/distribution/distribution.enum';
import { SymptomEntity } from 'src/symptom/entities/symptom.entity';
import { CaseEntity } from 'src/case/entities/case.entity';
import { TreatmentEntity } from 'src/treatment/entities/treatment.entity';
import { InjuryPhotoEntity } from 'src/injury_photo/entities/injury_photo.entity';
import { AutomaticCaseEntity } from 'src/automatic_case/entities/automatic_case.entity';

@ObjectType()
@Entity()
export class InjuryEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: InjuryTypes,
    default: InjuryTypes.AMPOLLA,
  })
  injury_type: InjuryTypes;

  @Column({
    type: 'enum',
    enum: Shapes,
    default: Shapes.ANILLO,
  })
  shapes: Shapes;

  @Column({
    type: 'numeric',
    default: 0,
  })
  injuryNUmber: number;

  @Column({
    type: 'enum',
    enum: Distribution,
    default: Distribution.ASIMETRICA,
  })
  distribution: Distribution;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  color: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  location: string;

  @ManyToMany(() => SymptomEntity, (symptom) => symptom.injuries)
  @JoinTable()
  symptoms: SymptomEntity[];

  @OneToMany(() => CaseEntity, (caso) => caso.injury)
  cases: CaseEntity[];

  @OneToMany(() => TreatmentEntity, (treatment) => treatment.injury)
  treatments: TreatmentEntity[];

  @OneToMany(() => InjuryPhotoEntity, (injuryPhoto) => injuryPhoto.injury)
  photos: InjuryPhotoEntity[];

  @OneToMany(() => AutomaticCaseEntity, (automaticCase) => automaticCase.injury)
  automatic_cases: AutomaticCaseEntity[];
}
