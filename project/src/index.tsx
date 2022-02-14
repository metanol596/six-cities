import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  OFFERS_COUNT: 5,
  cities: [
    {
      id: 1,
      label: 'Paris',
      isActive: false,
    },
    {
      id: 2,
      label: 'Cologne',
      isActive: false,
    },
    {
      id: 3,
      label: 'Brussels',
      isActive: false,
    },
    {
      id: 4,
      label: 'Amsterdam',
      isActive: true,
    },
    {
      id: 5,
      label: 'Hamburg',
      isActive: false,
    },
    {
      id: 6,
      label: 'Dusseldorf',
      isActive: false,
    },
  ],

};

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount={Setting.OFFERS_COUNT}
      cities={Setting.cities}
    />
  </React.StrictMode>,
  document.getElementById('root'));
