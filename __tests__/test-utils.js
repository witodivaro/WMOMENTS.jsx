import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../src/redux/store';
import React from 'react';

const AllTheProviders = ({children}) => {
  return (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react-native';

export {customRender as render};
