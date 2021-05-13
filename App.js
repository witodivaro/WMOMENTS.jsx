/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import PlacesStackNavigator from './src/navigators/stack/places/places.navigator';
import {init} from './src/db/db';
import COLORS from './src/constants/colors';
import SplashScreen from 'react-native-splash-screen';
import NotificationService from './NotificationService';

if (process.env.NODE_ENV === 'development') {
  init()
    .then(res => {
      console.log('Initialized database');
    })
    .catch(err => {
      console.log('Database initializing failed');
      console.log(err);
    });
} else {
  init();
}

const Notifications = new NotificationService();

const App = () => {
  useEffect(() => {
    const appStateChangeHandler = state => {
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
    <NavigationContainer>
      <SafeAreaView style={styles.screen}>
        <PlacesStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
