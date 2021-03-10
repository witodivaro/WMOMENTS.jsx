import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    console.log('notification', notification);
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  attachActionHandler(handler) {
    this.onAction = handler;
  }

  attachNotificationHandler(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onNotification: handler.onNotification.bind(handler),
  requestPermissions: Platform.OS === 'ios',
});

export default handler;
