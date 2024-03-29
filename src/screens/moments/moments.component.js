import React, { useMemo, useCallback } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import COLORS from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectMomentsListStructuredByDate } from '../../redux/moments/moments.selectors';
import { fetchMomentsFromDB } from '../../redux/moments/moments.thunks';
import NotificationService from '../../../NotificationService';
import MomentsGroup from '../../components/moments-group/moments-group.component';
import Button from '../../components/common/button/button';
import { launchCamera } from 'react-native-image-picker';

const Notifications = new NotificationService();

const renderMomentGroup = ({ item }) => {
  const [momentDate, moments] = item;

  return <MomentsGroup key={momentDate} date={momentDate} moments={moments} />;
};

const MomentsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const structuredMoments = useSelector(selectMomentsListStructuredByDate);

  useEffect(() => {
    const notificationOpenHandler = () => {
      navigation.navigate('new-moment');
    };

    Notifications.attachNotificationHandler(notificationOpenHandler);
  }, [navigation]);

  const addNewMomentHandler = useCallback(() => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.errorCode) {
          let errorMessage = '';

          switch (response.errorCode) {
            case 'camera_unavailable':
              errorMessage = 'Camera is unavailable on your device.';
              break;
            case 'permission':
              errorMessage = 'Application has no permissions to use camera.';
              break;
            case 'other':
              errorMessage = response.errorMessage;
              break;
          }

          return Alert.alert(errorMessage);
        }

        navigation.navigate('new-moment', { uri: response.uri });
      },
    );
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchMomentsFromDB());

    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={EvilHeaderButton}>
          <Item
            iconName="plus"
            color={COLORS.primary}
            iconSize={35}
            onPress={addNewMomentHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [dispatch, navigation, addNewMomentHandler]);

  const renderedContent = useMemo(() => {
    const momentDates = Object.keys(structuredMoments);

    if (!momentDates.length) {
      return (
        <View style={styles.noMoments}>
          <Text style={styles.noMomentsText}>You have no moments saved!</Text>
          <Button onPress={addNewMomentHandler}>
            <Text style={styles.buttonText}>Add new moment</Text>
          </Button>
        </View>
      );
    }

    const momentEntries = Object.entries(structuredMoments);

    return (
      <FlatList
        data={momentEntries}
        nestedScrollEnabled={true}
        keyExtractor={entry => entry[0]}
        renderItem={renderMomentGroup}
      />
    );
  }, [structuredMoments, addNewMomentHandler]);

  return <View style={styles.screen}>{renderedContent}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noMoments: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMomentsText: {
    marginBottom: 20,
    fontSize: 20,
    color: COLORS.primary,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
    },
    textShadowRadius: 2,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 18,
    textShadowRadius: 1,
    shadowOpacity: 0.1,
  },
});

export default MomentsScreen;
