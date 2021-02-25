import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/AvenirNextLTPro-Bold.otf'
import './assets/fonts/AvenirNextLTPro-Demi.otf'
import './assets/fonts/AvenirNextLTPro-Regular.otf'

import { Provider } from 'react-redux';
import store from './store'

import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

