import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapPreview from '../../components/map-preview/map-preview.component';
import COLORS from '../../constants/colors';
import {createLocationByIdSelector} from '../../redux/locations/locations.selectors';
import moment from 'moment-mini';
import {useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import Modal from 'react-native-modal';
import {removeLocation} from '../../redux/locations/locations.thunks';
const NoImage = require('../../assets/no-image.png');

const LocationDetailsScreen = ({route}) => {
  const {locationId} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const selectedLocation = useSelector(createLocationByIdSelector(locationId));
  const [location] = useState(selectedLocation);
  const {date, id, imagePath, lat, lng, title} = location;

  const toggleDeleteModalVisible = useCallback(() => {
    setIsDeleteModalVisible((isDeleteModalVisible) => !isDeleteModalVisible);
  }, [setIsDeleteModalVisible]);

  const deleteLocationHandler = useCallback(() => {
    dispatch(removeLocation({id: locationId}));
    toggleDeleteModalVisible();
    navigation.navigate('locations');
  }, [id, dispatch, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={EvilHeaderButton}>
          <Item
            iconName="trash"
            color={Platform.OS === 'ios' ? COLORS.primary : 'white'}
            iconSize={30}
            onPress={toggleDeleteModalVisible}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, id]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.locationDetails}>
        <Image
          style={styles.image}
          source={
            imagePath
              ? {
                  uri: imagePath,
                }
              : NoImage
          }
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
      <Modal
        backdropOpacity={0.4}
        onBackdropPress={toggleDeleteModalVisible}
        isVisible={isDeleteModalVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Do you want to delete this location? {'\n'} '{title}'
          </Text>
          <View style={styles.modalActions}>
            <View style={styles.modalAction}>
              <Button
                title="DELETE"
                color="red"
                onPress={deleteLocationHandler}
              />
            </View>
            <View style={styles.modalAction}>
              <Button title="CANCEL" onPress={toggleDeleteModalVisible} />
            </View>
          </View>
        </View>
      </Modal>
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
  modalView: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.primary,
  },
  modalActions: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalAction: {
    marginHorizontal: 10,
  },
});

export default LocationDetailsScreen;
