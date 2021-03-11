import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
};

const newMomentSlice = createSlice({
  initialState,
  name: 'newMoment',
  reducers: {
    setLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    clearNewMoment(state) {
      state.selectedLocation = null;
    },
  },
});

export const {setLocation, clearNewMoment} = newMomentSlice.actions;
export default newMomentSlice.reducer;
