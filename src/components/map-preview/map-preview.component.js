import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ENV from '../../config/env';

const MapPreview = ({style, location, children}) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${ENV.GOOGLE_API_KEY}`;
  }
  console.log(imagePreviewUrl);

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
