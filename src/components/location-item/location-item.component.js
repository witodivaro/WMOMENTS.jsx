import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import SCREENS from '../../config/screens';
import Colors from '../../constants/colors';

const LocationItem = ({item}) => {
  const {title, location, image} = item;
  const navigation = useNavigation();

  const itemClickHandler = () => {
    navigation.navigate(SCREENS.LocationDetails.name, {
      locationTitle: title,
    });
  };

  return (
    <TouchableOpacity onPress={itemClickHandler} style={styles.locationItem}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
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
