import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn,OneToOne } from 'typeorm';

@Entity()
export class Doctor {

  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    enabled:boolean;

  @Column({ type: 'date' })
  enabled_date:string;

  @OneToOne(() => User, user => user.doctor)
  user: User;
}
