import { combineReducers } from 'redux';
import auth from './authReducers';
import meetups from './meetupReducers';
import profile from './profileReducer';

const reducers = combineReducers({ auth, meetups, profile });

export default reducers;
