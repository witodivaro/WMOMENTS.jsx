import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import SCREENS from '../../config/screens';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import EvilHeaderButton from '../../components/evil-header-button/evil-header-button.component';
import COLORS from '../../constants/colors';

const LocationsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={EvilHeaderButton}>
          <Item
            iconName="plus"
            color={Platform.OS === 'ios' ? COLORS.primary : 'white'}
            iconSize={35}
            onPress={() => navigation.navigate(SCREENS.NewLocation.name)}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <View>
      <Text>Locations screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LocationsScreen;
