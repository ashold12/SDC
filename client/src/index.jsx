import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
