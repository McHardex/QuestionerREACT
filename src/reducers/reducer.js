import { combineReducers } from 'redux';
import auth from './authReducers';
import meetups from './meetupReducers';
import profile from './profileReducer';
import admin from './adminReducer';

const reducers = combineReducers({
  auth, meetups, profile, admin,
});

export default reducers;
