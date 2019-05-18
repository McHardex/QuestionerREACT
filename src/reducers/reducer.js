import { combineReducers } from 'redux';
import auth from './authReducers';
import meetups from './meetupReducers';
import profile from './profileReducer';
import admin from './adminReducer';
import loading from './loadingReducer';

const reducers = combineReducers({
  auth, meetups, profile, admin, loading,
});

export default reducers;
