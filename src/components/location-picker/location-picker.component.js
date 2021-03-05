import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../constants/colors';
import Geolocation from 'react-native-geolocation-service';
import {useState} from 'react/cjs/react.development';
import MapPreview from '../map-preview/map-preview.component';

const LocationPicker = ({onPositionPicked}) => {
  const [error, setError] = useState('');
  const [position, setPosition] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getGeolocationHandler = () => {
    const getPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
      }

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    };

    const getLocation = async () => {
      await getPermission();
      setIsFetching(true);

      Geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsFetching(false);

          onPositionPicked({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          setIsFetching(false);
        },
        {enableHighAccuracy: true, timeout: 15000, showLocationDialog: true},
      );
    };

    getLocation();
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
      <MapPreview location={position}>{renderedPositionFallback}</MapPreview>
      <Button
        title="Get user geolocation"
        onPress={getGeolocationHandler}
        color={COLORS.primary}
      />
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
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
