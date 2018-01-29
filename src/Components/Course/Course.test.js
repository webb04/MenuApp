import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Course from './Course';
import { STARTERS, MAINS, DESSERTS } from '../../menu';

it('Shows correct quantity', () => {
  const course = mount(<Course title={ 'Starters' } dishes={ STARTERS } />);
  course.setProps({ selected: [
    {
      name: "Bruschetta",
      price: "4.50",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Bruschetta",
      price: "4.50",
      type: "starter",
      quantityLeft: 10
    }]
  });
  expect(course.find('.amount').text()).toBe(' x2╳')
});
