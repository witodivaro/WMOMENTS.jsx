import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  Alert,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ImageSelector from '../../components/image-selector/image-selector.component';
import LocationPicker from '../../components/location-picker/location-picker.component';
import COLORS from '../../constants/colors';

import { addMoment } from '../../redux/moments/moments.thunks';

const NewMomentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { uri, selectedLocation } = route.params;
  const [titleValue, setTitleValue] = useState('');
  const [imageUri, setImageUri] = useState(uri);
  const [location, setLocation] = useState(selectedLocation);

  useEffect(() => {
    if (uri) {
      setImageUri(uri);
    }

    if (selectedLocation) {
      setLocation(selectedLocation);
    }
  }, [uri, selectedLocation]);

  useEffect(() => {
    const saveMomentInStorage = async () => {
      await AsyncStorage.setItem('new_uri', uri);
      await AsyncStorage.setItem('new_location', location);
    };

    saveMomentInStorage();
  }, [uri, location]);

  useEffect(() => {
    const getMomentFromStorage = async () => {
      const storedLocation = await AsyncStorage.getItem('new_location');
      const storedUri = await AsyncStorage.getItem('new_uri');
      const storedTitle = await AsyncStorage.getItem('new_title');
      if (storedLocation) {
        setLocation(storedLocation);
      }

      if (storedUri) {
        setImageUri(storedUri);
      }

      if (storedTitle) {
        setTitleValue(storedTitle);
      }
    };
    getMomentFromStorage();
  }, []);

  const locationChangeHandler = useCallback(async newLocation => {
    setLocation(newLocation);
    await AsyncStorage.setItem('new_location', newLocation);
  }, []);

  const titleChangeHandler = async text => {
    await AsyncStorage.setItem('new_title', text);
    setTitleValue(text);
  };

  const saveLocationHandler = async () => {
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

    await AsyncStorage.clear();
    navigation.navigate('moments');
  };

  const imageTakenHandler = async newUri => {
    await AsyncStorage.setItem('new_title', newUri);
    setImageUri(newUri);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <ImageSelector uri={imageUri} onImageTaken={imageTakenHandler} />
        <LocationPicker
          location={location}
          onLocationPick={locationChangeHandler}
        />
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
