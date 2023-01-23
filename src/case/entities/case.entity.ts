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
import Doctor from 'src/doctor/entities/doctor.entity';
import { Injury } from 'src/injury/entities/injury.entity';
import { Treatment } from 'src/treatment/entities/treatment.entity';

@Entity()
export class Case {
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

  @ManyToOne(() => Doctor, (doctor) => doctor.cases)
  doctor: Doctor;

  @ManyToOne(() => Injury, (injury) => injury.cases)
  injury: Injury;

  @OneToMany(() => Treatment, (treatment) => treatment.caso)
  treatments: Treatment[];
}
