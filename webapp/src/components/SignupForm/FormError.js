import React from 'react';
import PropTypes from 'prop-types';

const FormError = (props) => {
  const divStyle = {
    fontSize: '11px',
    color: '#f77'
  };
  const pStyle = {
    margin: '0px'
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
