import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const {addLocation} = locationsSlice.actions;
export default locationsSlice.reducer;
