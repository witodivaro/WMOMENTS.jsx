import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {insertLocation} from '../../db/db';

const initialState = {
  list: [],
};

export const addLocation = createAsyncThunk(
  'locations/addLocation',
  async ({title, location, imagePath}, {rejectWithValue}) => {
    const fileName = imagePath.split('/').pop();
    const newPath =
      (Platform.OS === 'android' ? 'file://' : '') +
      RNFS.DocumentDirectoryPath +
      `/${fileName}`;

    try {
      await RNFS.moveFile(imagePath, newPath);
      const dbResult = await insertLocation({
        title,
        location: 'Mock location',
        imagePath: newPath,
        lat: 15.6,
        lng: 12.3,
      });

      return {
        title,
        location,
        imagePath: newPath,
        id: dbResult.insertId.toString(),
      };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  extraReducers: {
    [addLocation.fulfilled]: (state, {payload}) => {
      const {title, location, imagePath, id} = payload;

      state.list.push({
        title,
        location,
        imagePath,
        id,
      });
    },
  },
});

export const {} = locationsSlice.actions;
export default locationsSlice.reducer;
