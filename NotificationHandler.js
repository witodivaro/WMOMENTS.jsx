import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    console.log('Notification handler: ', notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  attachNotificationHandler(handler) {
    this._onRegister = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onNotification: handler.onNotification.bind(handler),
  onAction: (action) => {
    console.log('ACTION: ', action);
  },
  requestPermissions: Platform.OS === 'ios',
  popInitialNotification: false,
});

export default handler;
