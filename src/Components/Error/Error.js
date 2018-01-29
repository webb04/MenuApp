import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Error.css';

class Error extends Component {
  render() {
    const { errors } = this.props;
        return errors.length > 0 ?
          <div className="error-list">
            {
              errors.map((error, key) =>
                <p className="error" key={ `error-${key}` }>
                  { error }
                </p>
              )
            }
          </div>
        : <div className="error-list empty"></div>
      }
}

Error.defaultProps = {
  errors: []
}

Error.propTypes = {
  errors: PropTypes.array
}

export default Error;
