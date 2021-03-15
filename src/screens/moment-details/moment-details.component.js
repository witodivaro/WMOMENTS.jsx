import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useMemo, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Platform, Button, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import {createThreeClosestMomentsByIdSelector} from '../../redux/moments/moments.selectors';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import Modal from 'react-native-modal';
import {removeMoment} from '../../redux/moments/moments.thunks';
import Carousel from 'react-native-snap-carousel';
import MomentDetails from '../../components/moment-details/moment-details.component';

const MomentDetailsScreen = ({route}) => {
  const {momentId} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [leftMoment, selectedMoment, rightMoment] = useSelector(
    createThreeClosestMomentsByIdSelector(momentId),
  );

  const [memoizedSelectedMoment, setMemoizedSelectedMoment] = useState(
    selectedMoment,
  );
  const {id, title} = memoizedSelectedMoment;
  const carouselRef = useRef();

  const toggleDeleteModalVisible = useCallback(() => {
    setIsDeleteModalVisible((isDeleteModalVisible) => !isDeleteModalVisible);
  }, [setIsDeleteModalVisible]);

  useEffect(() => {
    setMemoizedSelectedMoment(selectedMoment);
  }, [selectedMoment]);

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

  useEffect(() => {
    let itemIndexToSnapTo = 1;
    if (!leftMoment) {
      itemIndexToSnapTo = 0;
    }

    carouselRef.current.snapToItem(itemIndexToSnapTo, false, false);
  }, [leftMoment, carouselRef]);

  const deleteMomentHandler = useCallback(() => {
    dispatch(removeMoment({id}));
    toggleDeleteModalVisible();
    navigation.navigate('moments');
  }, [dispatch, removeMoment, id]);

  const renderedCarousel = useMemo(() => {
    const carouselData = [selectedMoment];
    if (leftMoment) carouselData.unshift(leftMoment);
    if (rightMoment) carouselData.push(rightMoment);

    const selectedMomentIndex = carouselData.indexOf(selectedMoment);

    const scrollToMomentHandler = (index) => {
      switch (index) {
        case selectedMomentIndex - 1:
          navigation.setParams({
            momentId: leftMoment.id,
          });
          break;

        case selectedMomentIndex + 1:
          navigation.setParams({
            momentId: rightMoment.id,
          });
          break;
      }
    };

    return (
      <Carousel
        ref={carouselRef}
        data={carouselData}
        onSnapToItem={scrollToMomentHandler}
        firstItem={selectedMomentIndex}
        onScrollToIndexFailed={() => {
          console.log('scroll failed');
        }}
        keyExtractor={(item) => `slide ${item.id.toString()}`}
        renderItem={({item}) => <MomentDetails moment={item} />}
        sliderWidth={400}
        itemWidth={400}
      />
    );
  }, [navigation, selectedMoment, rightMoment, leftMoment]);

  return (
    <>
      {renderedCarousel}
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
    </>
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
});

export default MomentDetailsScreen;
