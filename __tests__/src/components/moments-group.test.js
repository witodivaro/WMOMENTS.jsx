import React from 'react';
import MomentsGroup from '../../../src/components/moments-group/moments-group.component';
import {render, fireEvent, screen} from '../../test-utils';

describe('moments group', () => {
  test('opens on click', () => {
    const momentsGroupWrapper = render(<MomentsGroup date={1} moments={[]} />);
    const {getByA11yLabel} = momentsGroupWrapper;

    const touchableWrapper = getByA11yLabel('open moments group');
    fireEvent.press(touchableWrapper);

    expect(getByA11yLabel('moments list').length).toBe(undefined);
  });
});
