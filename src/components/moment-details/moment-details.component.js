import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapPreview from '../map-preview/map-preview.component';
import momentDateFormatter from 'moment-mini';
import COLORS from '../../constants/colors';
import Button from '../common/button/button';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { createShareMessage } from '../../constants/messages';

const MomentDetails = ({ moment }) => {
  const { lat, lng, date, title } = moment;
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

  const share = async () => {
    const imagePath = await RNFS.readFile(moment.imagePath, 'base64');

    await Share.open({
      message: createShareMessage(title, date),
      url: `data:image/png;base64,${imagePath}`,
      title: 'Ауф',
    });
  };

  return (
    <View style={styles.momentDetails}>
      <View style={styles.metadataContainer}>
        <Text style={styles.date}>
          {momentDateFormatter(date).format('hh:mm A')}
        </Text>
        <Button style={styles.shareButton} onPress={share}>
          <Text style={styles.shareText}>Share</Text>
        </Button>
      </View>
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
    color: COLORS.primary,
    backgroundColor: 'transparent',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  shareButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.primary,
  },
  shareText: {
    color: COLORS.primary,
  },
  metadataContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default MomentDetails;
