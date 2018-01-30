import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Calculates and displays price', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.instance().getTotal([])).toBe(0);
  const selected = [
    {
      name: "Prawn Cocktail",
      price: "6",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Pâté",
      price: "5",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Vegetarian lasagne",
      price: "12",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    }
  ];
  expect(wrapper.instance().getTotal(selected)).toBe(34.5);
  wrapper.setState({ selected, total: wrapper.instance().getTotal(selected) });
  expect(wrapper.find('.total').text()).toBe('£34.5');
});

it('Validates at least two mains', () => {
  const wrapper = shallow(<App />);
  const lessThanTwoMains = [
    {
      name: "Prawn Cocktail",
      price: "6",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Pâté",
      price: "5",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Sticky toffe pudding",
      price: "4",
      type: "dessert",
      quantityLeft: 10
    },
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    }
  ];
  wrapper.setState({ selected: lessThanTwoMains });
  wrapper.find('.reserve').simulate('click');
  const lessThanTwoMainsError = 'Each person must have at least two courses, one of which must be a main.';
  expect(wrapper.state().errors.includes(lessThanTwoMainsError)).toBe(true);
  expect(wrapper.find('.reserve').text()).toBe('Place Reservation');
});

it('Validates no dupliated courses', () => {
  const wrapper = shallow(<App />);
  const dupeMainCourses = [
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Pâté",
      price: "5",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Sticky toffe pudding",
      price: "4",
      type: "dessert",
      quantityLeft: 10
    },
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    }
  ];
  wrapper.setState({ selected: dupeMainCourses });
  wrapper.find('.reserve').simulate('click');
  const dupeMainCoursesError = 'Each diner cannot have more than one of the same course.';
  expect(wrapper.state().errors.includes(dupeMainCoursesError)).toBe(true);
  expect(wrapper.find('.reserve').text()).toBe('Place Reservation');
});

it('Validates pierre\'s rule - no prawn cocktail and salmon fillet together', () => {
  const wrapper = shallow(<App />);
  const dupeMainCourses = [
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Salmon fillet",
      price: "14",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Prawn Cocktail",
      price: "6",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Ice Cream",
      price: "3.5",
      type: "dessert",
      quantityLeft: 10
    }
  ];
  wrapper.setState({ selected: dupeMainCourses });
  wrapper.find('.reserve').simulate('click');
  const pierreError = 'Pierre strongly advises against the prawn cocktail and salmon fillet combination';
  expect(wrapper.state().errors.includes(pierreError)).toBe(true);
  expect(wrapper.find('.reserve').text()).toBe('Place Reservation');
});

it('Validates no orders greater than the remaining quantity', () => {
  const wrapper = shallow(<App />);
  const tooManyCheesecakes = [
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Salmon fillet",
      price: "14",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Cheesecake",
      price: "4",
      type: "dessert",
      quantityLeft: 1
    },
    {
      name: "Cheesecake",
      price: "4",
      type: "dessert",
      quantityLeft: 1
    }
  ];
  wrapper.setState({ selected: tooManyCheesecakes });
  wrapper.find('.reserve').simulate('click');
  const overQuantityError = 'We only have 1 Cheesecake left.';
  expect(wrapper.state().errors.includes(overQuantityError)).toBe(true);
  expect(wrapper.find('.reserve').text()).toBe('Place Reservation');
});

it('Order is placed when valid', () => {
  const wrapper = shallow(<App />);
  const selected = [
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Salmon fillet",
      price: "14",
      type: "main",
      quantityLeft: 10
    },
    {
      name: "Soup of the day",
      price: "5",
      type: "starter",
      quantityLeft: 10
    },
    {
      name: "Cheesecake",
      price: "4",
      type: "dessert",
      quantityLeft: 1
    }
  ];
  expect(wrapper.state().orderPlaced).toBe(false);
  wrapper.setState({ selected });
  wrapper.find('.reserve').simulate('click');
  expect(wrapper.state().orderPlaced).toBe(true);
  expect(wrapper.find('.reserve').text()).toBe('Order Placed');
});


it('User can restart order process', () => {
  const wrapper = shallow(<App />);
  const selected = [
    {
      name: "Meatballs",
      price: "11.50",
      type: "main",
      quantityLeft: 10
    }
  ];

  const defaultState = {
    total: 0,
    selected: [],
    orderPlaced: false,
    errors: []
  }

  expect(wrapper.state().orderPlaced).toBe(false);
  wrapper.setState({ selected });
  wrapper.find('.new-order').simulate('click');
  expect(wrapper.state()).toEqual(defaultState);
  expect(wrapper.find('.reserve').text()).toBe('Place Reservation');
});
