import { createAction } from '@reduxjs/toolkit';

import { Offer } from '../types/offer';

export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  LOAD_OFFERS: 'LOAD_OFFERS',
};

export const cityChange = createAction(Action.CITY_CHANGE, (value) => ({payload: value}));
export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);
