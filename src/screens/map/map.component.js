import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = () => {
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={mapRegion} />
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
});

export default MapScreen;
