import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

import rootReducer from './reducers'
import App from './App';
import './index.css';

import { requestLogin } from './actions/auth';

import { loadState, saveState } from './loadState';

/* verkefni sett upp til að styðja async actions í redux */
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});

let initialState = loadState();
if (initialState && initialState.auth) {
  store.dispatch(requestLogin(initialState.auth));
} else {
  store.dispatch(requestLogin({}));
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
