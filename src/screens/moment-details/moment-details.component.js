import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import {
  createMomentByIdSelector,
  selectMomentsImagesAndIDs,
} from '../../redux/moments/moments.selectors';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import Modal from 'react-native-modal';
import {removeMoment} from '../../redux/moments/moments.thunks';
import Carousel from 'react-native-snap-carousel';
import MomentDetails from '../../components/moment-details/moment-details.component';
const NoImage = require('../../assets/no-image.png');

const DEVICE_WIDTH = Dimensions.get('window').width;

const MomentDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {momentId} = route.params;

  const momentsImagesAndIDs = useSelector(selectMomentsImagesAndIDs);
  const selectedMoment = useSelector(createMomentByIdSelector(momentId));
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {id, title} = selectedMoment;

  const toggleDeleteModalVisible = useCallback(() => {
    setIsDeleteModalVisible((isDeleteModalVisible) => !isDeleteModalVisible);
  }, [setIsDeleteModalVisible]);

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
      title,
    });
  }, [navigation, id, toggleDeleteModalVisible]);

  const deleteMomentHandler = useCallback(() => {
    dispatch(removeMoment({id}));
    toggleDeleteModalVisible();
    navigation.navigate('moments');
  }, [dispatch, removeMoment, id]);

  const renderedCarousel = useMemo(() => {
    const selectedMomentIndex = momentsImagesAndIDs.indexOf(
      momentsImagesAndIDs.find(
        (momentImageAndID) => momentImageAndID.id === selectedMoment.id,
      ),
    );

    const scrollToMomentHandler = (index) => {
      switch (index) {
        case selectedMomentIndex - 1:
          navigation.setParams({
            momentId: momentsImagesAndIDs[selectedMomentIndex - 1].id,
          });
          break;

        case selectedMomentIndex + 1:
          navigation.setParams({
            momentId: momentsImagesAndIDs[selectedMomentIndex + 1].id,
          });
          break;
      }
    };

    return (
      <Carousel
        data={momentsImagesAndIDs}
        onSnapToItem={scrollToMomentHandler}
        firstItem={selectedMomentIndex}
        onScrollToIndexFailed={() => {
          console.log('scroll failed');
        }}
        keyExtractor={(item, index) => `slide ${index}: ${item.id.toString()}`}
        renderItem={({item}) => (
          <Image
            style={styles.image}
            source={
              item.imagePath
                ? {
                    uri: item.imagePath,
                  }
                : NoImage
            }
            resizeMode="cover"
          />
        )}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH}
        style={{
          height: 200,
        }}
      />
    );
  }, [navigation, momentsImagesAndIDs, selectedMoment]);

  const renderedModal = useMemo(
    () => (
      <Modal
        backdropOpacity={0.4}
        onBackdropPress={toggleDeleteModalVisible}
        isVisible={isDeleteModalVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Do you want to delete this moment? {'\n'} '{title}'
          </Text>
          <View style={styles.modalActions}>
            <View style={styles.modalAction}>
              <Button
                title="DELETE"
                color={COLORS.primary}
                onPress={deleteMomentHandler}
              />
            </View>
            <View style={[styles.modalAction]}>
              <Button
                title="CANCEL"
                color={COLORS.primary}
                onPress={toggleDeleteModalVisible}
              />
            </View>
          </View>
        </View>
      </Modal>
    ),
    [
      deleteMomentHandler,
      toggleDeleteModalVisible,
      title,
      isDeleteModalVisible,
    ],
  );

  return (
    <ScrollView>
      {renderedCarousel}
      <MomentDetails moment={selectedMoment} />
      {renderedModal}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  image: {
    height: 300,
    width: '100%',
  },
});

export default MomentDetailsScreen;
