import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    price: 120,
    isPremium: true,
    isFavorite: false,
    imgPath: 'img/apartment-01.jpg',
    title: 'Beautiful &amp; luxurious apartment at great location',
    roomType: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 2,
    price: 120,
    isPremium: false,
    isFavorite: true,
    imgPath: 'img/room.jpg',
    title: 'Wood and stone place',
    roomType: 'Private room',
    city: 'Amsterdam',
  },
  {
    id: 3,
    price: 120,
    isPremium: false,
    isFavorite: true,
    imgPath: 'img/apartment-02.jpg',
    title: 'Canal View Prinsengracht',
    roomType: 'Apartment',
    city: 'Amsterdam',
  },
  {
    id: 4,
    price: 120,
    isPremium: true,
    isFavorite: false,
    imgPath: 'img/apartment-03.jpg',
    title: 'Nice, cozy, warm big bed apartment',
    roomType: 'Apartment',
    city: 'Amsterdam',
  },
];
