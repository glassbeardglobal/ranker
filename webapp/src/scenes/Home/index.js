import React from 'react';
import SignupForm from 'components/SignupForm';

require('./home.css');

const Home = () => (
  <div className="home container col-wrapper">
    <div className="text-main col-8">
      <h1>Organize your ideas with Ranker</h1>
    </div>

    <div className="col-4">
      <SignupForm />
    </div>
  </div>
);

export default Home;
