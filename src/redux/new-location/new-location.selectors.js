import {createSelector} from '@reduxjs/toolkit';

const selectNewLocation = (state) => state.newLocation;

export const selectNewLocationSelectedLocation = createSelector(
  selectNewLocation,
  (newLocation) => newLocation.selectedLocation,
);
