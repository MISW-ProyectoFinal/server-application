import { User } from './../../user/entities/user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  device_type: string;

  @Column()
  notification_token: string;

  @Column({
    default: true,
  })
  active: boolean;
}
