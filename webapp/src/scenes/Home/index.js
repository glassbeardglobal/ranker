import React from 'react';
import PropTypes from 'prop-types';

import SignupForm from 'components/SignupForm';

require('./home.css');

const Home = (props) => {
  const redirect = () => {
    props.history.push('/boards');
  };

  return (
    <div className="home">
      <div className="container col-wrapper">
        <div className="col-7">
          <div className="text-main">
            <h1>Organize your thoughts</h1>
            <p>Ranker&#39;s platform empowers you to prioritize
            ideas in an easy and intuitive way</p>
          </div>
        </div>

        <div className="col-1" />

        <div className="col-4">
          <div className="signup-form-wrapper">
            <SignupForm redirect={redirect} />
          </div>
        </div>
      </div>
    </div>);
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Home;
