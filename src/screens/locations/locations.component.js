import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import COLORS from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocationsList} from '../../redux/locations/locations.selectors';
import LocationItem from '../../components/location-item/location-item.component';
import {fetchLocationsFromDB} from '../../redux/locations/locations.thunks';

const renderLocationItem = ({item}) => {
  return <LocationItem item={item} />;
};

const LocationsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const locations = useSelector(selectLocationsList);

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

  return (
    <View>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLocationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LocationsScreen;
