import React from 'react';
import PropTypes from 'prop-types';

import Constants from 'common/js/constants';

const Button = (props) => {
  const onClick = () => {
    window.localStorage.removeItem(Constants.JWT_KEY_STORAGE);
    props.redirect();
  };

  return <button type="button" onClick={onClick}>Log Out</button>;
};

Button.propTypes = {
  redirect: PropTypes.func.isRequired
};

export default Button;
