import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn,OneToOne,OneToMany } from 'typeorm';

@Entity()
export class Patient {

  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    accept_terms:boolean;

  @Column({ type: 'date' })
    enabled_date:string;

  @OneToOne(() => User, user => user.patient)
  user: User;
}
