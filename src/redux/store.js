import {configureStore} from '@reduxjs/toolkit';

import locationsReducer from './locations/locations.slice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
});
