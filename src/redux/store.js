import {configureStore} from '@reduxjs/toolkit';

import momentsReducer from './moments/moments.slice';
import newMomentReducer from './new-moment/new-moment.slice';

export const store = configureStore({
  reducer: {
    moments: momentsReducer,
    newMoment: newMomentReducer,
  },
});
