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
import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectNewLocationSelectedLocation} from '../../redux/new-location/new-location.selectors';
import {setLocation} from '../../redux/new-location/new-location.slice';

const LocationPicker = () => {
  const [error, setError] = useState('');
  const [position, setPosition] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const selectedLocation = useSelector(selectNewLocationSelectedLocation);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLocation) {
      setPosition({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });
    }
  }, [selectedLocation]);

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
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          dispatch(setLocation(newLocation));
          setIsFetching(false);
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

  const pickOnMapHandler = () => {
    navigation.navigate('map', {
      selectedLocation: selectedLocation,
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
      <MapPreview onPress={pickOnMapHandler} location={position}>
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
    marginBottom: 10,
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
