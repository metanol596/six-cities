import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';

import { store } from './store';
import { fetchOffersAction } from './store/offers-process/offers-process';
import { checkAuthAction } from './store/api-actions';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
