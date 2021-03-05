import {createSelector} from '@reduxjs/toolkit';

const selectLocations = (state) => state.locations;

export const selectLocationsList = createSelector(
  selectLocations,
  (locations) => locations.list,
);

export const createLocationByIdSelector = (locationId) =>
  createSelector(selectLocationsList, (locationsList) =>
    locationsList.find((location) => location.id === locationId),
  );
