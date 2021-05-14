import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const MapPreview = ({ style, location, children, onPress }) => {
  let imagePreviewUrl = null;

  if (location) {
    imagePreviewUrl = `https://static-maps.yandex.ru/1.x/?ll=${location.lng},${location.lat}&size=450,450&z=16&l=map&pt=${location.lng},${location.lat},vkbkm,`;
  }

  const renderedImage = useMemo(
    () =>
      imagePreviewUrl ? (
        <Image style={[styles.mapImage]} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      ),
    [imagePreviewUrl, children],
  );

  return (
    <TouchableOpacity onPress={onPress} style={[styles.mapPreview, style]}>
      {renderedImage}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    marginBottom: 10,
    shadowRadius: 5,
    shadowOpacity: 0.12,
    elevation: 5,
    backgroundColor: '#eee',
  },
  mapImage: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
