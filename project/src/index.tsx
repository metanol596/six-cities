import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import { offers, CITY } from './mocks/offers';

const Setting = {
  OFFERS_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount={Setting.OFFERS_COUNT}
      offers={offers}
      city={CITY}
    />
  </React.StrictMode>,
  document.getElementById('root'));
