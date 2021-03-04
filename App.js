/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import PlacesStackNavigator from './src/navigators/stack/places/places.navigator';
import {init} from './src/db/db';

init()
  .then((res) => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Database initializing failed');
    console.log(err);
  });

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
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
