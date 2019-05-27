import { combineReducers } from 'redux';
import auth from './authReducers';
import meetups from './meetupReducers';
import profile from './profileReducer';
import admin from './adminReducer';
import loader from './loadingReducer';

const reducers = combineReducers({
  auth, meetups, profile, admin, loader,
});

export default reducers;
