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
    this.scheduleNotification({
      id: NOTIFICATION_ID.REMINDER,
      title: `Did you forget?`,
      message: `It's time to add new locations!`,
      delay: 5 * 1000,
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

  attachActionHandler(handler) {
    return () => {};
  }
}
