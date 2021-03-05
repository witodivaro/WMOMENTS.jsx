import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const MapPreview = ({style, location, children}) => {
  let imagePreviewUrl = null;

  if (location) {
    imagePreviewUrl = `https://static-maps.yandex.ru/1.x/?ll=${location.lng},${location.lat}&size=450,450&z=16&l=map&pt=${location.lng},${location.lat},vkbkm,`;
  }

  return (
    <View style={[styles.mapPreview, style]}>
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{uri: imagePreviewUrl}} />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
