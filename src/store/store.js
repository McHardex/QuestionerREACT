import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducer';

export default createStore(
  reducers,
  compose(applyMiddleware(thunk)),
);
