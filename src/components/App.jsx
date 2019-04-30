/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../lib/store';
import LandingPage from './LandingPage';
import Signup from './Signup';
import Login from './Login';
import Admin from './Admin';
import Meetup from './Meetup';
import MeetupDetails from './MeetupDetails';
import Profile from './Profile';
import NOTFOUND from './404';

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

            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/meetups" component={Meetup} />
            <Route path="/admin" component={Admin} />
            <Route path="/not-found" component={NOTFOUND} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
);

export default App;
