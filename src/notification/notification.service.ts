import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationToken } from './entities/notification-token.entity';
import { NotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'firebase-admin-sdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepo: Repository<NotificationToken>,
  ) {}

  async acceptPushNotification(
    user: any,
    notification_dto: NotificationDto,
  ): Promise<NotificationToken> {
    await this.notificationTokenRepo.update(
      { userId: user.id },
      {
        active: false,
      },
    );
    // save to db
    const notification_token = await this.notificationTokenRepo.save({
      userId: user.id,
      device_type: notification_dto.device_type,
      notification_token: notification_dto.notification_token,
      active: true,
    });
    return notification_token;
  }

  async disablePushNotification(
    user: any,
    update_dto: UpdateNotificationDto,
  ): Promise<void> {
    try {
      await this.notificationTokenRepo.update(
        { userId: user.id, device_type: update_dto.device_type },
        {
          active: false,
        },
      );
    } catch (error) {
      return error;
    }
  }

  async getNotifications(): Promise<any> {
    return await this.notificationsRepo.find();
  }

  async sendPush(user: any, title: string, body: string): Promise<any> {
    try {
      const notification = await this.notificationTokenRepo.findOne({
        where: { userId: user.id, active: true },
      });
      console.log(notification);
      if (notification) {
        await this.notificationsRepo.save({
          notification_token: notification,
          title,
          body,
          active: true,
          created_by: user.email,
        });

        return await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: notification.notification_token,
            // android: { priority: 'high' },
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } catch (error) {
      return error;
    }
  }
}
