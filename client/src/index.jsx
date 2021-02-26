import React from 'react';
import ReactDOM from 'react-dom';
// React redux stuff.
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@reduxjs/toolkit';
// All reducers combined in rootReducer.
// import rootReducers from './reducers';
// End redux stuff.
import App from './App.jsx';

// Create our first data store.
// composeWithDevTools() enables debug through Redux Dev Tools
// Passing our reducers, and a dummy state.
// const store = createStore(
//   rootReducers, { itemActions: { favorites: [] } }, composeWithDevTools(),
// );
// Set up our rootElement, we'll need this for Provider
// which allows us to pass state through our entire app.
const rootElement = document.getElementById('app');

// Easy redux guide https://programmingwithmosh.com/redux/getting-started-with-react-redux/
// ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);
ReactDOM.render(<App />, rootElement);
