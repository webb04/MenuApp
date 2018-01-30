import React from 'react';
import ReactDOM from 'react-dom';
import Error from './Error';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

it('Does not render container if no errors', () => {
  const wrapper = shallow(<Error errors={ [] } />);
  expect(wrapper.find('.empty')).toHaveLength(1);
});

it('Renders correct error messages', () => {
  const errors = [
    'Pierre strongly advises against the prawn cocktail and salmon fillet combination',
    'Each diner cannot have more than one of the same course.',
    'Each person must have at least two courses, one of which must be a main.'
  ];
  const wrapper = shallow(<Error errors={ errors } />);
  expect(wrapper.find('.empty')).toHaveLength(0);
  expect(wrapper.find('.error')).toHaveLength(3);

  const error = renderer
    .create(<Error errors={ errors } />)
    .toJSON();
  expect(error).toMatchSnapshot();

});
