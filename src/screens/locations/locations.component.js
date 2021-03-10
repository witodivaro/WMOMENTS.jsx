import React, {useMemo, useCallback} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import COLORS from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocationsList} from '../../redux/locations/locations.selectors';
import LocationItem from '../../components/location-item/location-item.component';
import {fetchLocationsFromDB} from '../../redux/locations/locations.thunks';
import NotificationService from '../../../NotificationService';

const renderLocationItem = ({item}) => {
  return <LocationItem item={item} />;
};

const Notifications = new NotificationService();

const LocationsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const locations = useSelector(selectLocationsList);

  useEffect(() => {
    const notificationOpenHandler = () => {
      navigation.navigate('new-location');
    };

    Notifications.attachNotificationHandler(notificationOpenHandler);
  }, []);

  useEffect(() => {
    dispatch(fetchLocationsFromDB());

    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={EvilHeaderButton}>
          <Item
            iconName="plus"
            color={Platform.OS === 'ios' ? COLORS.primary : 'white'}
            iconSize={35}
            onPress={() => navigation.navigate('new-location')}
          />
        </HeaderButtons>
      ),
    });
  }, [dispatch]);

  const navigateToNewLocationsScreenHandler = useCallback(() => {
    navigation.navigate('new-location');
  }, [navigation]);

  const renderedContent = useMemo(
    () =>
      locations.length > 0 ? (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLocationItem}
        />
      ) : (
        <View style={styles.noLocations}>
          <Text style={styles.noLocationsText}>
            You have no locations saved!
          </Text>
          <Button
            title="ADD NEW LOCATION"
            onPress={navigateToNewLocationsScreenHandler}
            color={COLORS.primary}
          />
        </View>
      ),
    [locations],
  );

  return <View style={styles.screen}>{renderedContent}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noLocations: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLocationsText: {
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

export default LocationsScreen;
