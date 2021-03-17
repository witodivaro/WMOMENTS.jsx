import * as momentsThunks from './moments.thunks';
import momentsReducer from './moments.slice';
import * as momentsSelectors from './moments.selectors';

describe('moments', () => {
  describe('reducer', () => {
    const initialState = {
      list: [],
    };

    test('should return the initial state', () => {
      expect(momentsReducer(undefined, {})).toEqual(initialState);
    });

    test('should update local list on fetchMomentsFromDB', () => {
      const mockMoment = {
        mock: 'mock',
      };

      expect(
        momentsReducer(initialState, {
          type: momentsThunks.fetchMomentsFromDB.fulfilled,
          payload: {
            items: [mockMoment],
          },
        }),
      ).toEqual({
        list: [mockMoment],
      });
    });

    test('should remove moment from list on removeMoment', () => {
      const stateMock = {
        list: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      };

      expect(
        momentsReducer(stateMock, {
          type: momentsThunks.removeMoment.fulfilled,
          payload: {id: 1},
        }),
      ).toEqual({
        list: [{id: 2}],
      });
    });

    test('unshift moment with initial params on addMoment fulfilled', () => {
      const stateMock = {
        list: [{id: 1}],
      };

      const momentMock = {
        id: 2,
        date: 'date',
        imagePath: 'imagePath',
        lat: 'lat',
        lng: 'lng',
        title: 'title',
      };

      expect(
        momentsReducer(stateMock, {
          type: momentsThunks.addMoment.fulfilled,
          payload: momentMock,
        }),
      ).toEqual({
        list: [
          {
            ...momentMock,
          },
          {
            id: 1,
          },
        ],
      });
    });
  });

  describe('selectors', () => {
    test('createMomentByIdSelector must return moment with same id', () => {
      const momentMock = {
        id: 2,
        testProp: 'testProp',
      };
      const storeStateMock = {
        moments: {
          list: [momentMock],
        },
      };

      expect(
        momentsSelectors.createMomentByIdSelector(2)(storeStateMock),
      ).toEqual({...momentMock});
    });

    test('createSameDateMomentImagesAndIDsSelector returns same date moment images & ids', () => {
      const storeStateMock = {
        moments: {
          list: [
            {
              date: new Date() - 20 ** 22,
              id: 1,
              imagePath: 1,
            },
            {
              date: new Date(),
              id: 2,
              imagePath: 2,
            },
            {
              date: 3,
              id: 3,
              imagePath: 3,
            },
            {
              date: 1,
              id: 4,
              imagePath: 4,
            },
          ],
        },
      };

      expect(
        momentsSelectors.createSameDateMomentImagesAndIDsSelector(3)(
          storeStateMock,
        ),
      ).toEqual([
        {
          id: 3,
          imagePath: 3,
        },
        {
          id: 4,
          imagePath: 4,
        },
      ]);
    });
  });
});
