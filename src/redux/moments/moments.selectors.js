import {createSelector} from '@reduxjs/toolkit';

const selectMoments = (state) => state.moments;

export const selectMomentsList = createSelector(
  selectMoments,
  (moments) => moments.list,
);

export const createThreeClosestMomentsByIdSelector = (momentId) =>
  createSelector(selectMomentsList, (momentsList) => {
    const wantedMoment = momentsList.find((moment) => moment.id === momentId);
    const wantedMomentIndex = momentsList.indexOf(wantedMoment);

    return [
      momentsList[wantedMomentIndex - 1],
      wantedMoment,
      momentsList[wantedMomentIndex + 1],
    ];
  });

export const selectMomentsListStructuredByDate = createSelector(
  selectMomentsList,
  (momentsList) => {
    const momentsObj = {};
    momentsList
      .slice()
      .sort((leftMoment, rightMoment) => leftMoment.date < rightMoment.date)
      .forEach((moment) => {
        const momentDate = new Date(moment.date);
        const date = new Date(
          momentDate.getFullYear(),
          momentDate.getMonth(),
          momentDate.getDate(),
        );

        momentsObj[date] = momentsObj[date]
          ? [...momentsObj[date], moment]
          : [moment];
      });

    return momentsObj;
  },
);
