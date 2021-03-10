/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button,
  Alert,
  AppState,
} from 'react-native';

import PlacesStackNavigator from './src/navigators/stack/places/places.navigator';
import {init} from './src/db/db';
import COLORS from './src/constants/colors';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationService from './NotificationService';
import NOTIFICATION_ID from './src/config/notification-id';

init()
  .then((res) => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Database initializing failed');
    console.log(err);
  });

const Notifications = new NotificationService();

const App = () => {
  useEffect(() => {
    AppState.addEventListener('change', (state) => {
      if (state.match(/inactive|background/)) {
        Notifications.setAppReminder();
      } else if (state === 'active') {
        Notifications.cancelAppReminder();
      }
    });

    SplashScreen.hide();
    Notifications.cancelNotification({
      id: NOTIFICATION_ID.REMINDER,
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={COLORS.primary} />
      <PlacesStackNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
