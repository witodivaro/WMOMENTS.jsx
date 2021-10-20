import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../constants/colors';
import Geolocation from 'react-native-geolocation-service';
import MapPreview from '../map-preview/map-preview.component';
import { useNavigation } from '@react-navigation/core';
import getGeolocationPermission from '../../helpers/permissions/getGeolocationPermission';

const LocationPicker = ({ location, onLocationPick }) => {
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation();

  const getGeolocationHandler = useCallback(async () => {
    await getGeolocationPermission();
    setIsFetching(true);

    Geolocation.getCurrentPosition(
      newPosition => {
        const newLocation = {
          lat: newPosition.coords.latitude,
          lng: newPosition.coords.longitude,
        };

        onLocationPick(newLocation);
        setIsFetching(false);
      },
      getPositionError => {
        setError(getPositionError.message);
        setIsFetching(false);
      },
      { enableHighAccuracy: true, timeout: 15000, showLocationDialog: true },
    );
  }, [onLocationPick]);

  useEffect(() => {
    getGeolocationHandler();
  }, [getGeolocationHandler]);

  const pickOnMapHandler = () => {
    navigation.navigate('map', {
      selectedLocation: location,
    });
  };

  const renderedPositionFallback = isFetching ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>{error}</Text>
  ) : (
    <Text>No geolocation chosen yet!</Text>
  );

  return (
    <View style={styles.locationPicker}>
      <MapPreview onPress={pickOnMapHandler} location={location}>
        {renderedPositionFallback}
      </MapPreview>
      <View style={styles.buttonContainer}>
        <Button
          title="Get user geolocation"
          onPress={getGeolocationHandler}
          color={COLORS.primary}
        />
        <Button
          title="Pick on map"
          onPress={pickOnMapHandler}
          color={COLORS.primary}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  mapPreview: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});
