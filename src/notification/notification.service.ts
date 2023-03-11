import { Injectable } from '@nestjs/common';
import axios from 'axios';

const BASE_URL = 'https://fcm.googleapis.com';
const API_KEY =
  'AAAAH5SyXKI:APA91bHxEFe8UQnx3aqCIxaL0O9YmoqOa0e4lqasMoUgyn4BGeNbx530j5BeBh2utXeSwsv8j-6vO5UJs6XhLXKZnHGROY6XW1w-FIdcrQ1e3H7G9CJC8pWAAZic2wNMUbZxtfIznV_U';

const optionsBuilder = (method: string, path: string, data: any) => {
  return {
    method,
    url: `${BASE_URL}/${path}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${API_KEY}`,
    },
    data: JSON.stringify(data),
  };
};

@Injectable()
export class NotificationService {
  async sendPush(user: any, title: string, body: string): Promise<any> {
    if (user.notification_token) {
      const data = {
        notification: {
          title: title,
          body: body,
        },
        webpush: {
          headers: {
            Urgency: 'high',
          },
        },
        to: user.notification_token,
      };
      const options = optionsBuilder('post', 'fcm/send', data);

      try {
        return await axios(options);
      } catch (error) {
        return console.error(error);
      }
    }
  }
}
