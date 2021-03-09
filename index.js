/**
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onNotification: (notification) => {
    console.log('NOTIFICATION: ', notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: 'local-notifications',
  channelName: 'Local notifications',
});

const RNNavigationRedux = () => (
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNNavigationRedux);
