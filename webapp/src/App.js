import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navigation';
import Home from './scenes/Home';
import Login from './scenes/Login';
import Rank from './scenes/Rank';

const App = () => (
  <div>
    <Navbar />

    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/rank" component={Rank} />
  </div>);

export default App;
