import React, { Component } from 'react';

import FormError from './FormError';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
      uEmail: {
        value: '',
        error: null
      },
      uPassword: {
        value: '',
        error: null
      }
    };

    this.submitAction = this.submitAction.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submitAction() {
    this.clearErrors();
    if (this.checkForm()) {
      return;
    }

    const body = {
      email: this.state.uEmail.value,
      password: this.state.uPassword.value
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

  checkForm() {
    let hasErrors = false;
    if (this.state.uEmail.value === '') {
      this.setState((prevState) => {
        const email = Object.assign({}, prevState.uEmail);
        email.error = 'You must provide an Email address';
        return { uEmail: email };
      });
      hasErrors = true;
    }

    if (this.state.uPassword.value === '') {
      this.setState((prevState) => {
        const password = Object.assign({}, prevState.uPassword);
        password.error = 'You must provide a password';
        return { uPassword: password };
      });
      hasErrors = true;
    }
    return hasErrors;
  }

  clearErrors() {
    this.setState({
      errors: null
    });
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      errors: null,
      [name]: {
        value,
        error: null
      }
    });
  }

  render() {
    return (
      <form className="signup-form">
        <fieldset>
          <FormError error={this.state.errors} />

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              className={(this.state.uEmail.error ? 'error' : '')}
              id="email"
              type="email"
              autoComplete="email"
              name="uEmail"
              value={this.state.uEmail.value}
              onChange={this.handleInputChange}
              required
            />
            <FormError error={this.state.uEmail.error} />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              className={this.state.uPassword.error ? 'error' : ''}
              id="password"
              type="password"
              name="uPassword"
              value={this.state.uPassword.value}
              onChange={this.handleInputChange}
              required
            />
            <FormError error={this.state.uPassword.error} />
          </div>

          <button type="button" onClick={this.submitAction}>Sign Up for Ranker</button>
        </fieldset>
      </form>
    );
  }
}

module.exports = SignupForm;
