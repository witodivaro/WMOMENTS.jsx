import React, {useMemo, useCallback} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import COLORS from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectMomentsList,
  selectMomentsListStructuredByDate,
} from '../../redux/moments/moments.selectors';
import MomentItem from '../../components/moment-item/moment-item.component';
import {fetchMomentsFromDB} from '../../redux/moments/moments.thunks';
import NotificationService from '../../../NotificationService';
import MomentsGroup from '../../components/moments-group/moments-group.component';

const Notifications = new NotificationService();

const MomentsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const moments = useSelector(selectMomentsList);
  const structuredMoments = useSelector(selectMomentsListStructuredByDate);

  useEffect(() => {
    const notificationOpenHandler = () => {
      navigation.navigate('new-moment');
    };

    Notifications.attachNotificationHandler(notificationOpenHandler);
  }, []);

  useEffect(() => {
    dispatch(fetchMomentsFromDB());

    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={EvilHeaderButton}>
          <Item
            iconName="plus"
            color={Platform.OS === 'ios' ? COLORS.primary : 'white'}
            iconSize={35}
            onPress={() => navigation.navigate('new-moment')}
          />
        </HeaderButtons>
      ),
    });
  }, [dispatch]);

  const navigateToNewmomentsScreenHandler = useCallback(() => {
    navigation.navigate('new-moment');
  }, [navigation]);

  const renderedContent = useMemo(() => {
    const momentDates = Object.keys(structuredMoments);

    if (!momentDates.length) {
      return (
        <View style={styles.noMoments}>
          <Text style={styles.noMomentsText}>You have no moments saved!</Text>
          <Button
            title="ADD NEW MOMENT"
            onPress={navigateToNewmomentsScreenHandler}
            color={COLORS.primary}
          />
        </View>
      );
    }

    return momentDates.map((momentDate) => (
      <MomentsGroup
        key={momentDate}
        date={momentDate}
        moments={structuredMoments[momentDate]}
      />
    ));
  }, [moments]);

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
});

export default MomentsScreen;
