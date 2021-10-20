import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
};

const newMomentSlice = createSlice({
  initialState,
  name: 'newMoment',
  reducers: {
    clearNewMoment(state) {
      state.selectedLocation = null;
    },
  },
});

export const { clearNewMoment } = newMomentSlice.actions;
export default newMomentSlice.reducer;
