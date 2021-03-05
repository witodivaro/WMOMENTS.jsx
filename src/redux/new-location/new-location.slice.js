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
  },
});

export const {setLocation} = newLocationSlice.actions;
export default newLocationSlice.reducer;
