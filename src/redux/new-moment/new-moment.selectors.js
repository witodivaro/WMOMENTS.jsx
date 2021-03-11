import {createSelector} from '@reduxjs/toolkit';

const selectNewMoment = (state) => state.newMoment;

export const selectNewMomentSelectedLocation = createSelector(
  selectNewMoment,
  (newMoment) => newMoment.selectedLocation,
);
