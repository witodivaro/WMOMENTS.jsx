import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SCREENS from '../../../config/screens';
import COLORS from '../../../constants/colors';

const PlacesStack = createStackNavigator();

const PlacesStackNavigator = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        headerTintColor: COLORS.primary,
      }}
      initialRouteName={SCREENS.Moments.name}>
      <PlacesStack.Screen
        name={SCREENS.Moments.name}
        key={SCREENS.Moments.key}
        component={SCREENS.Moments.component}
        options={{
          title: 'Moments',
        }}
      />
      <PlacesStack.Screen
        name={SCREENS.NewMoment.name}
        key={SCREENS.NewMoment.key}
        component={SCREENS.NewMoment.component}
        options={{
          title: 'New moment',
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
      <PlacesStack.Screen
        name={SCREENS.MomentDetails.name}
        key={SCREENS.MomentDetails.key}
        component={SCREENS.MomentDetails.component}
        options={({route}) => ({
          title: route.params.momentTitle,
        })}
      />
    </PlacesStack.Navigator>
  );
};

export default PlacesStackNavigator;
