import * as newMomentActions from './new-moment.slice';
import newMomentReducer from './new-moment.slice';

describe('new moment', () => {
  describe('reducer', () => {
    test('should clear selectedLocation on clearNewMoment action', () => {
      const initialStateMock = {
        selectedLocation: 'some var',
      };
      expect(
        newMomentReducer(initialStateMock, {
          type: newMomentActions.clearNewMoment,
        }),
      ).toEqual({
        selectedLocation: null,
      });
    });

    test('should set selectedLocation on setLocation action', () => {
      const initialStateMock = {
        selectedLocation: null,
      };
      expect(
        newMomentReducer(initialStateMock, {
          type: newMomentActions.setLocation,
          payload: 'not null',
        }),
      ).toEqual({
        selectedLocation: 'not null',
      });
    });
  });
});
