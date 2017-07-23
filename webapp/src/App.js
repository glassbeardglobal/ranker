import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navigation';
import Home from './scenes/Home';

const App = () => (
  <div>
    <Navbar />

    <Route exact path="/" component={Home} />
  </div>);

export default App;
