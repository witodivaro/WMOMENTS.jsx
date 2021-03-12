import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
import MapPreview from '../map-preview/map-preview.component';

const NoImage = require('../../assets/no-image.png');

const MomentDetails = ({moment}) => {
  const {imagePath, lat, lng} = moment;
  const navigation = useNavigation();

  const navigateToMapHandler = useCallback(() => {
    navigation.navigate('map', {
      unchangable: true,
      selectedLocation: {
        lat,
        lng,
      },
    });
  }, [lat, lng, navigation]);

  return (
    <ScrollView>
      <View style={styles.momentDetails}>
        <Image
          style={styles.image}
          source={
            imagePath
              ? {
                  uri: imagePath,
                }
              : NoImage
          }
          resizeMode="cover"
        />
        <MapPreview
          location={{
            lat,
            lng,
          }}
          onPress={navigateToMapHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  momentDetails: {
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
    width: '100%',
    height: 400,
  },
});

export default MomentDetails;
