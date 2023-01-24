import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PaymentStatus } from 'src/payment_status/payment_status.enum';
import { CaseStatus } from 'src/case_status/case_status.enum';
import { CurrencyType } from 'src/currency_type/currency_type.enum';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';
import { InjuryEntity } from 'src/injury/entities/injury.entity';
import { TreatmentEntity } from 'src/treatment/entities/treatment.entity';

@Entity()
export class CaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CaseStatus,
    default: CaseStatus.PENDIENTE,
  })
  case_status: CaseStatus;

  @Column({
    type: 'date',
  })
  start_date: Date;

  @Column({
    type: 'date',
  })
  end_date: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  pending_payment: boolean;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDIENTE,
  })
  payment_status: PaymentStatus;

  @Column({
    type: 'float',
  })
  amount: number;

  @Column({
    type: 'varchar',
  })
  cci: string;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    default: CurrencyType.COP,
  })
  currency_type: CurrencyType;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.cases)
  doctor: DoctorEntity;

  @ManyToOne(() => InjuryEntity, (injury) => injury.cases)
  injury: InjuryEntity;

  @OneToMany(() => TreatmentEntity, (treatment) => treatment.caso)
  treatments: TreatmentEntity[];
}
