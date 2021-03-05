import {createSlice, current} from '@reduxjs/toolkit';
import {addLocation, fetchLocationsFromDB} from './locations.thunks';

const initialState = {
  list: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  extraReducers: {
    [addLocation.fulfilled]: (state, {payload}) => {
      const {title, lat, lng, imagePath, id} = payload;

      state.list.unshift({
        title,
        lat,
        lng,
        imagePath,
        id,
      });
    },
    [addLocation.rejected]: (state, {payload}) => {
      console.log('ADD LOCATION REJECT: ', payload);
    },
    [fetchLocationsFromDB.fulfilled]: (state, {payload}) => {
      const {items} = payload;
      state.list = items;
    },
  },
});

export const {} = locationsSlice.actions;
export default locationsSlice.reducer;
