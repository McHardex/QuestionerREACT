import { combineReducers } from 'redux';
import auth from './authReducers';
import meetups from './meetupReducers';

const reducers = combineReducers({ auth, meetups });

export default reducers;
