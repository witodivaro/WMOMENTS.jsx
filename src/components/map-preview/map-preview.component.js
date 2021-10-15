import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import getMapPreviewLink from '../../helpers/previews/getMapPreviewLink';

const MapPreview = ({ style, location, children, onPress }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    console.log(location);
    if (location) {
      const { lng, lat } = location;
      setImagePreviewUrl(getMapPreviewLink(lng, lat));
    }
  }, [location]);

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
