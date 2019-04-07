/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

const App = () => (
  <div>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          {/* <ProtectedRoute path="/createride" component={CreateRide} /> */}
          {/* <ProtectedRoute path="/allrides/:rideid" component={OneRide} /> */}
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
