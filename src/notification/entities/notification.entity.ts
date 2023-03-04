import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NotificationToken } from './notification-token.entity';

@Entity({ name: 'notification' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'notification_token_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  notification_token: NotificationToken;

  @Column()
  title: string;

  @Column({ nullable: true })
  body: string;

  @Column()
  created_by: string;

  @Column({
    default: true,
  })
  active: boolean;
}
