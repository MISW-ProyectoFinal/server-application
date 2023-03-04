import { User } from './../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  device_type: string;

  @Column()
  notification_token: string;

  @Column({
    default: true,
  })
  active: boolean;
}
