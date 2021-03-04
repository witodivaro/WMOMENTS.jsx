import {createAction, createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const addLocation = createAction(
  'locations/addLocation',
  (title, location, image) => ({
    payload: {
      title,
      location,
      image,
      id: nanoid(),
    },
  }),
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  extraReducers: {
    [addLocation]: (state, {payload}) => {
      const {title, location, image, id} = payload;

      state.list.push({
        title,
        location,
        image,
        id,
      });
    },
  },
});

export const {} = locationsSlice.actions;
console.log(locationsSlice.actions);
export default locationsSlice.reducer;
