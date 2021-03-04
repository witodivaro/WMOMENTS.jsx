import {createSelector} from '@reduxjs/toolkit';

const selectLocations = (state) => state.locations;

export const selectLocationsList = createSelector(
  selectLocations,
  (locations) => locations.list,
);
