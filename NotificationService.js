import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotificationService {
  constructor(onNotification) {
    this.lastId = 0;

    this.createDefaultChannels();

    NotificationHandler.attachNotificationHandler(onNotification);
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

  scheduleNotification({delay, title, message}) {
    this.lastId++;

    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + delay),
      channelId: 'default-channel-id',
      id: this.lastId,
      title: title,
      message: message,
      ignoreInForeground: true,
    });
  }

  checkPermission(cb) {
    return PushNotification.checkPermissions(cb);
  }

  requestPermissions() {}
}
