/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../lib/store';
import LandingPage from './LandingPage';
import Signup from './Signup';
import Login from './Login';
import Admin from './Admin';
import Meetup from './Meetup';
import MeetupDetails from './MeetupDetails';
import Profile from './Profile';

const App = () => (
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/meetups" component={Meetup} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/meetups/:id" component={MeetupDetails} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
);

export default App;
