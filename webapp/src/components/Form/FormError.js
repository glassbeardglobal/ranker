import React from 'react';
import PropTypes from 'prop-types';

const FormError = (props) => {
  const divStyle = {
    fontSize: '11px'
  };
  const pStyle = {
    margin: '0px',
    color: '#f77'
  };

  return (
    <div style={divStyle}>
      <p style={pStyle}>{props.error}</p>
    </div>
  );
};

FormError.defaultProps = {
  error: ''
};

FormError.propTypes = {
  error: PropTypes.string
};

export default FormError;
