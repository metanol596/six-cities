import { createReducer } from '@reduxjs/toolkit';
import { cityChange, loadOffers } from './action';

import { Cities } from '../const';

import { InitialState } from '../types/initialState';

const initialState: InitialState = {
  city: Cities.Paris,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
