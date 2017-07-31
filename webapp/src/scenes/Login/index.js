import React, { Component } from 'react';

import 'common/form.css';
import FormError from 'components/Form/FormError';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitAction = this.submitAction.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  submitAction() {
    this.setState({
      errors: null
    });

    const body = {
      email: this.state.email,
      password: this.state.password
    };
    const fetchInit = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    };
    fetch('/api/signup', fetchInit).then(response => response.json())
      .then((json) => {
        // TODO: redirect on success, throw error on invalid
        console.log(json);
      })
      .catch((err) => {
        this.setState({
          errors: err.message
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="login">
          <h1>Log in to Ranker</h1>

          <form className="login-form form">
            <FormError error={this.state.errors} />

            <div className="form-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>

            <button type="button" onClick={this.submitAction}>Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
