import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';

import SCREENS from '../../../config/screens';
import COLORS from '../../../constants/colors';

const PlacesStack = createStackNavigator();

const PlacesStackNavigator = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        ...Platform.select({
          ios: {
            headerTintColor: COLORS.primary,
          },
          default: {
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: 'white',
          },
        }),
      }}
      initialRouteName={SCREENS.Locations.name}>
      <PlacesStack.Screen
        name={SCREENS.Locations.name}
        key={SCREENS.Locations.key}
        component={SCREENS.Locations.component}
        options={{
          title: 'Locations',
        }}
      />
      <PlacesStack.Screen
        name={SCREENS.NewLocation.name}
        key={SCREENS.NewLocation.key}
        component={SCREENS.NewLocation.component}
        options={{
          title: 'New location',
        }}
      />
      <PlacesStack.Screen
        name={SCREENS.Map.name}
        key={SCREENS.Map.key}
        component={SCREENS.Map.component}
        options={{
          title: 'Map',
        }}
      />
    </PlacesStack.Navigator>
  );
};

export default PlacesStackNavigator;
