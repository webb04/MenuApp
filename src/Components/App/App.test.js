import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Calculates price', () => {
  // TODO
});

it('Validates two mains', () => {
  // TODO
});

it('Validates no dupe courses', () => {
  // TODO
});

it('Validates pierre\'s rule', () => {
  // TODO
});

it('Validates quantityLeft', () => {
  // TODO
});
