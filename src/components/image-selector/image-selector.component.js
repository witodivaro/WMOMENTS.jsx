import React, { useState } from 'react';
import { Button, StyleSheet, Image, Text, View } from 'react-native';
import COLORS from '../../constants/colors';

import { launchCamera } from 'react-native-image-picker';

const ImageSelector = ({ uri, onImageTaken }) => {
  const [error, setError] = useState('');

  const takeImageHadler = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.errorCode) {
          let errorMessage = '';
          switch (response.errorCode) {
            case 'camera_unavailable':
              errorMessage = 'Camera is unavailable on your device.';
              break;
            case 'permission':
              errorMessage = 'Application has no permissions to use camera.';
              break;
            case 'other':
              errorMessage = response.errorMessage;
              break;
          }
          setError(errorMessage);
        }
        onImageTaken(response.uri);
      },
    );
  };

  const renderedImage = uri ? (
    <Image
      style={styles.image}
      source={{
        uri,
      }}
    />
  ) : (
    <Text>{error || 'No image picked yet.'}</Text>
  );

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>{renderedImage}</View>
      <Button
        title="Take image"
        onPress={takeImageHadler}
        color={COLORS.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    width: '100%',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
    shadowOpacity: 0.26,
    shadowRadius: 5,
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageSelector;
