import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  OFFERS_COUNT: 5,
  offers: [
    {
      id: 1,
      price: 120,
      isPremium: true,
      isFavorite: false,
      imgPath: 'img/apartment-01.jpg',
      title: 'Beautiful &amp; luxurious apartment at great location',
      roomType: 'Apartment',
    },
    {
      id: 2,
      price: 120,
      isPremium: false,
      isFavorite: true,
      imgPath: 'img/room.jpg',
      title: 'Wood and stone place',
      roomType: 'Private room',
    },
    {
      id: 3,
      price: 120,
      isPremium: false,
      isFavorite: false,
      imgPath: 'img/apartment-02.jpg',
      title: 'Canal View Prinsengracht',
      roomType: 'Apartment',
    },
    {
      id: 4,
      price: 120,
      isPremium: true,
      isFavorite: false,
      imgPath: 'img/apartment-03.jpg',
      title: 'Nice, cozy, warm big bed apartment',
      roomType: 'Apartment',
    },
    {
      id: 5,
      price: 120,
      isPremium: false,
      isFavorite: true,
      imgPath: 'img/room.jpg',
      title: 'Wood and stone place',
      roomType: 'Private room',
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount={Setting.OFFERS_COUNT}
      offers={Setting.offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
