import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import LandingPage from './LandingPage';
import Signup from './Signup';
import Login from './Login';
import Admin from './Admin';
import Meetup from './Meetup';
import MeetupDetails from './MeetupDetails';
import Profile from './Profile';
import NotFound from './NotFound';

const App = () => (
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/meetups/:id" component={MeetupDetails} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/meetups" component={Meetup} />
            <Route path="/admin" component={Admin} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
);

export default App;
