import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.scss';
import App from './components/app/App';
import Store from './redux/Store';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


