import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from './components/logIn/LogIn';
import Display from './components/display/Display';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => <LogIn /> } />
        <Route exact path='/feed' render={(props) => <Display />} />
      </Switch>
    )
  }
}

export default App;
