import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import COLORS from '../../constants/colors';
import {setLocation} from '../../redux/new-location/new-location.slice';

const MapScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const selectedLocation = route.params?.selectedLocation || null;
  const unchangable = route.params?.unchangable || false;

  const [unsavedSelectedLocation, setUnsavedSelectedLocation] = useState(null);

  const mapRegion = {
    latitude: unsavedSelectedLocation?.lat || selectedLocation?.lat || 37.78,
    longitude: unsavedSelectedLocation?.lng || selectedLocation?.lng || -122.43,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const selectLocationHandler = (e) => {
    if (unchangable) return;

    const {longitude, latitude} = e.nativeEvent.coordinate;
    setUnsavedSelectedLocation({
      lng: longitude,
      lat: latitude,
    });
  };

  const saveLocationHandler = () => {
    dispatch(setLocation(unsavedSelectedLocation));
    navigation.navigate('new-location');
  };

  const renderedMarker =
    unsavedSelectedLocation || selectedLocation ? (
      <Marker
        title="Selected location"
        coordinate={{
          latitude: unsavedSelectedLocation?.lat || selectedLocation.lat,
          longitude: unsavedSelectedLocation?.lng || selectedLocation.lng,
        }}
      />
    ) : null;

  const renderedSaveButton = unsavedSelectedLocation ? (
    <TouchableOpacity style={styles.button} onPress={saveLocationHandler}>
      <Text style={styles.text}>Save</Text>
    </TouchableOpacity>
  ) : null;

  return (
    <View style={styles.mapContainer}>
      {renderedSaveButton}
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}>
        {renderedMarker}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    borderRadius: 20,
    zIndex: 1,
    marginBottom: 20,
    padding: 10,
  },
  text: {
    fontSize: 40,
    color: COLORS.primary,
    textTransform: 'uppercase',
    textShadowRadius: 2,
    textShadowColor: COLORS.primary,
  },
});

export default MapScreen;
