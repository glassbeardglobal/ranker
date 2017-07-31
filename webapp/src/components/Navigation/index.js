import React from 'react';
import { NavLink } from 'react-router-dom';

require('./navigation.css');

const links = [
  { exact: true, to: '/', text: 'Home' },
  { exact: true, to: '/login', text: 'Log In' }
];

const Navbar = () => {
  const navLinks = [];
  links.forEach((link) => {
    navLinks.push(
      <NavLink key={link.to} exact={link.exact} to={link.to}>
        <div className="link-wrapper">
          {link.text}
        </div>
      </NavLink>
    );
  });

  return (
    <header>
      <div className="logo">
        <NavLink exact to="/">
          Ranker
        </NavLink>
      </div>
      <nav className="navbar">
        {navLinks}
      </nav>
    </header>);
};

export default Navbar;
