import {createSlice} from '@reduxjs/toolkit';
import {addMoment, fetchMomentsFromDB, removeMoment} from './moments.thunks';

const initialState = {
  list: [],
};

const momentsSlice = createSlice({
  name: 'moments',
  initialState,
  extraReducers: {
    [addMoment.fulfilled]: (state, {payload}) => {
      const {title, lat, lng, imagePath, id} = payload;

      state.list.unshift({
        title,
        lat,
        lng,
        imagePath,
        id,
      });
    },
    [fetchMomentsFromDB.fulfilled]: (state, {payload}) => {
      const {items} = payload;
      state.list = items;
    },
    [removeMoment.fulfilled]: (state, {payload}) => {
      const {id} = payload;

      state.list = state.list.filter((moment) => moment.id !== id);
    },
  },
});

export const {} = momentsSlice.actions;
export default momentsSlice.reducer;
