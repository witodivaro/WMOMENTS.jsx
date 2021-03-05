import {configureStore} from '@reduxjs/toolkit';

import locationsReducer from './locations/locations.slice';
import newLocationReducer from './new-location/new-location.slice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    newLocation: newLocationReducer,
  },
});
