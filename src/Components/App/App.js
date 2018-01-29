import React, { Component } from 'react';
import logo from '../../logo.svg';
import { atLeastTwoMains, noDupeCourses, pierreRule, checkQuantityLeft } from '../../validation';

import Course from '../Course/Course';
import Error from '../Error/Error';

import { STARTERS, MAINS, DESSERTS } from '../../menu';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      selected: [],
      orderPlaced: false
    }

    this.onReserve = this.onReserve.bind(this);
    this.clear = this.clear.bind(this);
  }

  selectDish(course, index) {
    if (this.state.orderPlaced) return;
    const selected = this.state.selected.concat([ course[index] ])
    this.setState({ selected: selected, total: this.getTotal(selected) })
  }

  clear(dish, e) {
    e.stopPropagation();
    if (this.state.orderPlaced) return;
    const selected = this.state.selected.filter(item => item.name !== dish.name);
    this.setState({ selected: selected, total: this.getTotal(selected) })
  }

  validate(selected) {
    const names = selected.map(dish => dish.name);
    return atLeastTwoMains(selected)
      .concat(noDupeCourses(selected))
      .concat(pierreRule(names))
      .concat(checkQuantityLeft(selected, names));
  }

  onReserve() {
    const errors = this.validate(this.state.selected);
    this.setState({ errors, orderPlaced: errors.length === 0 });
  }

  getTotal(selected) {
    return selected.map(dish => dish.price).reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
  }

  render() {
    const { total, selected, errors, orderPlaced } = this.state;
    const reserveClasses = orderPlaced ? "reserve success" : "reserve";
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div>
          <h1>Reservation for 2</h1>
          { total > 0 ? <h2>{ `£${total}`}</h2> : <h2 className="hidden">{ `£${total}`}</h2> }
        </div>
        <div className="restaurant">
          <Course title={ 'Starters' } dishes={ STARTERS } selected={ selected } selectDish={ this.selectDish.bind(this, STARTERS) } clear={ this.clear }/>
          <Course title={ 'Mains' } dishes={ MAINS } selected={ selected } selectDish={ this.selectDish.bind(this, MAINS) } clear={ this.clear }/>
          <Course title={ 'Desserts' } dishes={ DESSERTS } selected={ selected } selectDish={ this.selectDish.bind(this, DESSERTS) } clear={ this.clear }/>
        </div>
        <Error errors= { errors }/>
        <div>
          <a className={ reserveClasses } onClick={ this.onReserve }>{ orderPlaced ? `Order Placed` : `Place Reservation`}</a>
        </div>
      </div>
    );
  }
}

export default App;
