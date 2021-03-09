import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import MapPreview from '../../components/map-preview/map-preview.component';
import COLORS from '../../constants/colors';
import {createLocationByIdSelector} from '../../redux/locations/locations.selectors';
import moment from 'moment-mini';

const LocationDetailsScreen = ({route}) => {
  const {locationId} = route.params;
  const navigation = useNavigation();

  const location = useSelector(createLocationByIdSelector(locationId));
  const {date, imagePath, lat, lng} = location;

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.locationDetails}>
        <Image
          style={styles.image}
          source={{
            uri: imagePath,
          }}
          resizeMode="contain"
        />
        <MapPreview
          location={{
            lat,
            lng,
          }}
          onPress={() => {
            navigation.navigate('map', {
              unchangable: true,
              selectedLocation: {
                lat,
                lng,
              },
            });
          }}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{moment(date).format('MMMM Do YYYY')}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  locationDetails: {
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
    width: '100%',
    height: 400,
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.primary,
  },
  dateContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  date: {
    color: 'white',
    fontSize: 20,
  },
});

export default LocationDetailsScreen;
