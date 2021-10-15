import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../constants/colors';
import {
  createMomentByIdSelector,
  createSameDateMomentImagesAndIDsSelector,
} from '../../redux/moments/moments.selectors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import Modal from 'react-native-modal';
import { removeMoment } from '../../redux/moments/moments.thunks';
import Carousel from 'react-native-snap-carousel';
import MomentDetails from '../../components/moment-details/moment-details.component';
const NoImage = require('../../assets/no-image.png');

const DEVICE_WIDTH = Dimensions.get('window').width;

const renderMomentImage = ({ item }) => (
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
);

const MomentDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { momentId } = route.params;

  const sameDateMomentImagesAndIDs = useSelector(
    createSameDateMomentImagesAndIDsSelector(momentId),
  );
  const selectedMoment = useSelector(createMomentByIdSelector(momentId));
  const [memoizedSelectedMoment, setMemoizedSelectedMoment] = useState(
    selectedMoment,
  );
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { id, title } = memoizedSelectedMoment;

  useEffect(() => {
    if (selectedMoment) {
      setMemoizedSelectedMoment(selectedMoment);
    }
  }, [selectedMoment]);

  const toggleDeleteModalVisible = useCallback(() => {
    setIsDeleteModalVisible(
      prevIsDeleteModalVisible => !prevIsDeleteModalVisible,
    );
  }, [setIsDeleteModalVisible]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={EvilHeaderButton}>
          <Item
            iconName="trash"
            color={COLORS.primary}
            iconSize={30}
            onPress={toggleDeleteModalVisible}
          />
        </HeaderButtons>
      ),
      title,
    });
  }, [navigation, id, toggleDeleteModalVisible, title]);

  const deleteMomentHandler = useCallback(() => {
    dispatch(removeMoment({ id }));
    toggleDeleteModalVisible();
    navigation.navigate('moments');
  }, [dispatch, id, toggleDeleteModalVisible, navigation]);

  const renderedCarousel = useMemo(() => {
    const selectedMomentIndex = sameDateMomentImagesAndIDs.indexOf(
      sameDateMomentImagesAndIDs.find(
        momentImageAndID => momentImageAndID.id === memoizedSelectedMoment.id,
      ),
    );

    const scrollToMomentHandler = index => {
      switch (index) {
        case selectedMomentIndex - 1:
          navigation.setParams({
            momentId: sameDateMomentImagesAndIDs[selectedMomentIndex - 1].id,
          });
          break;

        case selectedMomentIndex + 1:
          navigation.setParams({
            momentId: sameDateMomentImagesAndIDs[selectedMomentIndex + 1].id,
          });
          break;
      }
    };

    return (
      <Carousel
        initialNumToRender={sameDateMomentImagesAndIDs.length}
        firstItem={selectedMomentIndex}
        data={sameDateMomentImagesAndIDs}
        onSnapToItem={scrollToMomentHandler}
        onScrollToIndexFailed={() => {
          console.log('scroll failed');
        }}
        keyExtractor={(item, index) => `slide ${index}: ${item.id.toString()}`}
        renderItem={renderMomentImage}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH}
        style={styles.carousel}
        lockScrollWhileSnapping={true}
      />
    );
  }, [navigation, sameDateMomentImagesAndIDs, memoizedSelectedMoment]);

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
      <MomentDetails moment={memoizedSelectedMoment} />
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
    height: DEVICE_WIDTH,
    width: '100%',
  },
  carousel: {
    height: 200,
  },
});

export default MomentDetailsScreen;
