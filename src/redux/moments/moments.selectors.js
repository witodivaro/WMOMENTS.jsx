import {createSelector} from '@reduxjs/toolkit';

const selectMoments = (state) => state.moments;

export const selectMomentsList = createSelector(
  selectMoments,
  (moments) => moments.list,
);

export const createMomentByIdSelector = (momentId) =>
  createSelector(selectMomentsList, (momentsList) => {
    const wantedMoment = momentsList.find((moment) => moment.id === momentId);

    return wantedMoment;
  });

export const selectMomentsImagesAndIDs = createSelector(
  selectMomentsList,
  (momentsList) =>
    momentsList.map((moment) => ({image: moment.image, id: moment.id})),
);

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
