import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Platform,
} from 'react-native';
import MapPreview from '../map-preview/map-preview.component';
import momentDateFormatter from 'moment-mini';
import COLORS from '../../constants/colors';

const NoImage = require('../../assets/no-image.png');

const MomentDetails = ({moment}) => {
  const {imagePath, lat, lng, date} = moment;
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
        <Text style={styles.date}>
          {momentDateFormatter(date).format('hh:mm A')}
        </Text>
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
  date: {
    padding: 10,
    borderColor: COLORS.primary,
    color: Platform.OS === 'ios' ? COLORS.primary : 'white',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : COLORS.primary,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default MomentDetails;
