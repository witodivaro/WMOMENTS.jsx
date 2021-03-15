import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, View, Text, Platform} from 'react-native';
import MapPreview from '../map-preview/map-preview.component';
import momentDateFormatter from 'moment-mini';
import COLORS from '../../constants/colors';

const MomentDetails = ({moment}) => {
  const {lat, lng, date} = moment;
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
    <View style={styles.momentDetails}>
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
  );
};

const styles = StyleSheet.create({
  momentDetails: {
    marginTop: 10,
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
