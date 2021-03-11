import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import moment from 'moment-mini';
import {useMemo} from 'react';

const NoImage = require('../../assets/no-image.png');

const MomentItem = ({item}) => {
  const {id, title, imagePath, date} = item;
  const navigation = useNavigation();

  const itemClickHandler = () => {
    navigation.navigate('moment-details', {
      momentTitle: title,
      momentId: id,
    });
  };

  const renderedMomentDate = useMemo(() => moment(date).fromNow(), [date]);

  return (
    <TouchableOpacity onPress={itemClickHandler} style={styles.MomentItem}>
      <Image
        style={styles.image}
        source={imagePath ? {uri: imagePath} : NoImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{renderedMomentDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  MomentItem: {
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
  moment: {
    color: '#666',
    fontSize: 16,
  },
});

export default MomentItem;
