import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';
import NOTIFICATION_ID from './src/config/notification-id';

export default class NotificationService {
  constructor() {
    this.lastId = 0;

    this.createDefaultChannels();
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default channel',
        channelDescription: 'A default channel for all basic notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) =>
        console.log(
          `createChannel 'default-channel-id' returned '${created}' `,
        ),
    );
  }

  localNofitication(notificationProps) {
    this.lastId++;

    PushNotification.localNotification({
      channelId: 'default-channel-id',
      autoCancel: true,
      invokeApp: true,

      id: this.lastId,
      ...notificationProps,
      ignoreInForeground: true,
    });
  }

  setAppReminder() {
    const ONE_HOUR = 60 * 60 * 1000;

    this.scheduleNotification({
      id: NOTIFICATION_ID.REMINDER,
      title: `Hey! How's it going?`,
      message: `Add your current moment to remember about it!`,
      delay: process.env.NODE_ENV === 'development' ? 5 * 1000 : ONE_HOUR,
    });
  }

  cancelAppReminder() {
    this.cancelNotification({
      id: NOTIFICATION_ID.REMINDER,
    });
  }

  scheduleNotification({id, delay, title, message}) {
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + delay),
      channelId: 'default-channel-id',
      id: id || ++this.lastId,
      userInfo: {
        id: id || ++this.lastId,
      },
      title: title,
      message: message,
      ignoreInForeground: true,
      invokeApp: false,
    });
  }

  cancelNotification({id}) {
    PushNotification.cancelLocalNotifications({
      id: id,
    });
  }

  checkPermission(cb) {
    return PushNotification.checkPermissions(cb);
  }

  attachNotificationHandler(handler) {
    NotificationHandler.attachNotificationHandler(handler);

    return () => {
      NotificationHandler.attachNotificationHandler(null);
    };
  }
}
