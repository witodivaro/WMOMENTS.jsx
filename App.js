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
import NotificationService from './NotificationService';

console.log(process.env);

init()
  .then((res) => {
    console.log('Initialized database2');
  })
  .catch((err) => {
    console.log('Database initializing failed');
    console.log(err);
  });

const Notifications = new NotificationService();

const App = () => {
  useEffect(() => {
    const appStateChangeHandler = (state) => {
      if (state.match(/inactive|background/)) {
        Notifications.setAppReminder();
      } else if (state === 'active') {
        Notifications.cancelAppReminder();
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

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
