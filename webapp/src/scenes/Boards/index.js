import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Constants from 'common/js/constants';

import LogoutButton from 'components/Buttons/Logout';

class Boards extends Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    if (!window.localStorage.getItem(Constants.JWT_KEY_STORAGE)) {
      this.goHome();
    }
  }

  goHome() {
    this.props.history.push('/');
  }

  render() {
    const jwtKey = window.localStorage.getItem(Constants.JWT_KEY_STORAGE);

    return (<div>
      <h1>Boards</h1>
      <p>{jwtKey}</p>
      <LogoutButton redirect={this.goHome} />
    </div>);
  }
}

Boards.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Boards;
