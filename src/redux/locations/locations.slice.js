import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

const initialState = {
  list: [],
};

export const addLocation = createAsyncThunk(
  'locations/addLocation',
  async ({title, location, imagePath}) => {
    const fileName = imagePath.split('/').pop();
    const newPath =
      Platform.OS === 'android'
        ? 'file://'
        : '' + RNFS.DocumentDirectoryPath + `/${fileName}`;

    await RNFS.moveFile(imagePath, newPath);

    return {
      title,
      location,
      imagePath: newPath,
      id: nanoid(),
    };
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
