import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
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

  const renderedMomentDate = useMemo(() => moment(date).format('h:mm A'), [
    date,
  ]);

  return (
    <TouchableOpacity onPress={itemClickHandler} style={styles.MomentItem}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={imagePath ? {uri: imagePath} : NoImage}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{renderedMomentDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  MomentItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    elevation: 5,
    shadowOpacity: 0.26,
    shadowOffset: {
      height: 1,
    },
    borderRadius: 35,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Platform.OS === 'ios' ? Colors.primary : 'transparent',
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: Platform.OS === 'ios' ? 'black' : 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  date: {
    color: Platform.OS === 'ios' ? 'black' : 'white',
  },
  moment: {
    color: '#666',
    fontSize: 16,
  },
});

export default MomentItem;
