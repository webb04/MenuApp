import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Course.css';

class Course extends Component {
  render() {
    const { title, dishes, selectDish, selected, clear } = this.props;

    return (
      <div>
        <h2>{ title }</h2>
        {
          dishes.map((dish, key) => {
            const quantity = selected.filter(item => item.name === dish.name).length;
            const amount = quantity
              ? <span className="amount">{` x${quantity}` }<span className="remove" onClick={ (e) => clear(dish, e) }>╳</span></span>
              : null;

            return (
              <p className="dish" key={ `${title}-${key}` } onClick={ () => selectDish(key) }>
                { dish.name } - { `£${dish.price}` }
                <span className="quantity">{ amount }</span>
              </p>
            )
          })
        }
      </div>
    );
  }
}

Course.defaultProps = {
  title: '',
  dishes: [],
  selectDish: () => {},
  selected: [],
  clear: () => {}
}

Course.propTypes = {
  title: PropTypes.string,
  dishes: PropTypes.array,
  selectDish: PropTypes.func,
  selected: PropTypes.array,
  clear: PropTypes.func
}

export default Course;
