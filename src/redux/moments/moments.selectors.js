import {createSelector} from '@reduxjs/toolkit';

const selectMoments = (state) => state.moments;

export const selectMomentsList = createSelector(
  selectMoments,
  (moments) => moments.list,
);

export const createMomentByIdSelector = (momentId) =>
  createSelector(selectMomentsList, (momentsList) =>
    momentsList.find((moment) => moment.id === momentId),
  );
