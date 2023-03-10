import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as path from 'path';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'firebase-admin-sdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  async sendPush(user: any, title: string, body: string): Promise<any> {
    try {
      console.log(user.notification_token);
      if (user.notification_token) {
        return await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: user.notification_token,
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
