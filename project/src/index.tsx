import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';

import { comments } from './mocks/comments';

import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App comments={comments} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
