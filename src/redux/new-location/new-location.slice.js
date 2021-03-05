import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
};

const newLocationSlice = createSlice({
  initialState,
  name: 'newLocation',
  reducers: {
    setLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    clearLocation(state) {
      state.selectedLocation = null;
    },
  },
});

export const {setLocation, clearLocation} = newLocationSlice.actions;
export default newLocationSlice.reducer;
