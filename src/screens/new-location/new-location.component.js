import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import SCREENS from '../../config/screens';
import COLORS from '../../constants/colors';

import {addLocation} from '../../redux/locations/locations.slice';

const NewLocationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [titleValue, setTitleValue] = useState('');

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const saveLocationHandler = () => {
    dispatch(addLocation(titleValue));
    navigation.navigate(SCREENS.Locations.name);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={titleChangeHandler}
          value={titleValue}
          style={styles.textInput}
        />
        <Button
          title="Save location"
          onPress={saveLocationHandler}
          color={COLORS.primary}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    marginBottom: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
});

export default NewLocationScreen;
