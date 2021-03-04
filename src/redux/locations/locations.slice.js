import {createSlice} from '@reduxjs/toolkit';
import {addLocation, fetchLocationsFromDB} from './locations.thunks';

const initialState = {
  list: [],
};

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
    [fetchLocationsFromDB.fulfilled]: (state, {payload}) => {
      const {items} = payload;
      state.list = items;
    },
  },
});

export const {} = locationsSlice.actions;
export default locationsSlice.reducer;
