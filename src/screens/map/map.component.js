import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import COLORS from '../../constants/colors';

const MapScreen = ({ navigation, route }) => {
  const { unchangable = false, location = { lat: 37.78, lng: -122.43 } } =
    route.params;
  const [touched, setTouched] = useState(false);

  const [mapRegion, setMapRegion] = useState({
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedLocation, setSelectedLocation] = useState(location);

  const selectLocationHandler = e => {
    if (unchangable) {
      return;
    }

    setTouched(true);
    const { longitude, latitude } = e.nativeEvent.coordinate;

    setSelectedLocation({
      lng: longitude,
      lat: latitude,
    });

    setMapRegion({
      ...mapRegion,
      latitude,
      longitude,
    });
  };

  const saveLocationHandler = () => {
    navigation.navigate('new-moment', { selectedLocation });
  };

  const renderedMarker = selectedLocation ? (
    <Marker
      title="Selected location"
      coordinate={{
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      }}
    />
  ) : null;

  const renderedSaveButton =
    selectedLocation && touched ? (
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
