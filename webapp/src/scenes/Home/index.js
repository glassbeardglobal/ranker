import React from 'react';
import Form from 'components/Form';

require('./home.css');

const Home = () => (
  <div className="home container">
    <div className="text-main">
      <h1>Organize your ideas with Ranker</h1>
    </div>
    <Form />
  </div>
);

export default Home;
