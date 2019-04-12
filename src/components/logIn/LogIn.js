import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const API_URL = 'https://api-iddog.idwall.co/signup';

class LogIn extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      loggedIn: false,
      responseMessage: '',
      token: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  validateEmail(text) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(text);
  }
  
  fetchToken(url = '', data = {}) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        token: json.user.token
      })
      console.log('token', this.state.token)
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    if (this.validateEmail(email)) {
      this.fetchToken( API_URL, { email })
      this.setState({ responseMessage: 'Thank you for registering!', loggedIn: true });
      this.setRedirect();
    } else {
      this.setState({ responseMessage: 'Please enter a valid email!'});
    }
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/feed' />
    }
  }

  render() {
    return (
      <React.Fragment>
        <label>Log In</label>
        <input
          type="email"
          name="email"
          placeholder="your Email"
          value={this.state.email}
          onChange={ e => this.handleChange(e)}
        />
        <div>
          {this.renderRedirect()}
          <Button variant="primary" onClick={this.handleFormSubmit}>
            Send
          </Button>
        </div>
        <div>
          {this.state.responseMessage}
        </div>
      </React.Fragment>
    )
  }
}

export default LogIn;
