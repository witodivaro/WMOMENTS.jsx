import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, Platform, UIManager } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { store } from './src/redux/store';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
