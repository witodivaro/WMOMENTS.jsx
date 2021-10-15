import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImageSelector from '../../components/image-selector/image-selector.component';
import LocationPicker from '../../components/location-picker/location-picker.component';
import COLORS from '../../constants/colors';

import { addMoment } from '../../redux/moments/moments.thunks';
import { selectNewMomentSelectedLocation } from '../../redux/new-moment/new-moment.selectors';

const NewMomentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedLocation = useSelector(selectNewMomentSelectedLocation);
  const [titleValue, setTitleValue] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (selectedLocation) {
      setLocation({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });
    }
  }, [selectedLocation]);

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const saveLocationHandler = () => {
    if (!titleValue) {
      Alert.alert('Invalid title.', 'Input the valid location title!', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    if (!location) {
      Alert.alert('Select geolocation.', 'No geolocation selected.', [
        {
          text: 'OK',
        },
      ]);
      return;
    }

    dispatch(
      addMoment({
        title: titleValue,
        location: location,
        imagePath: imageUri,
      }),
    );
    navigation.navigate('moments');
  };

  const imageTakenHandler = uri => {
    setImageUri(uri);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker />
        <View style={styles.titleSelector}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            onChangeText={titleChangeHandler}
            value={titleValue}
            style={styles.textInput}
          />
        </View>
        <Button
          title="Save moment"
          onPress={saveLocationHandler}
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    color: COLORS.primary,
    alignSelf: 'flex-start',

    padding: 0,
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
  },
  titleSelector: {
    marginVertical: 20,
    shadowOpacity: 0.26,
    backgroundColor: '#eee',
    shadowOffset: {
      height: 2,
    },
    elevation: 6,
  },
  textInput: {
    marginHorizontal: 20,
    marginBottom: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
});

export default NewMomentScreen;
