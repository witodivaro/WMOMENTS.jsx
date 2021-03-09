import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import moment from 'moment-mini';

const NoImage = require('../../assets/no-image.png');

const LocationItem = ({item}) => {
  const {id, title, imagePath, date} = item;
  const navigation = useNavigation();

  const itemClickHandler = () => {
    navigation.navigate('location-details', {
      locationTitle: title,
      locationId: id,
    });
  };

  return (
    <TouchableOpacity onPress={itemClickHandler} style={styles.locationItem}>
      <Image
        style={styles.image}
        source={imagePath ? {uri: imagePath} : NoImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{moment(date).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  location: {
    color: '#666',
    fontSize: 16,
  },
});

export default LocationItem;
