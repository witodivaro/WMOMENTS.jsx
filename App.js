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
} from 'react-native';

import PlacesStackNavigator from './src/navigators/stack/places/places.navigator';
import {init} from './src/db/db';
import COLORS from './src/constants/colors';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationService from './NotificationService';

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
  triggerNotificationHandler = () => {
    Notifications.scheduleNotification({
      delay: 5 * 1000,
      title: 'Delayed message',
      message: 'Omega lul u recieved it in 5 seconds after it was pushed.',
    });
  };

  useEffect(() => {
    SplashScreen.hide();
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
