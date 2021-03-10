import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    console.log('Notification handler: ', notification);

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onAction(notification) {
    console.log(notification);
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
  onAction: handler.onAction.bind(handler),
  requestPermissions: Platform.OS === 'ios',
  popInitialNotification: false,
});

export default handler;
