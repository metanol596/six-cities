import { createReducer } from '@reduxjs/toolkit';
import { cityChange, loadOffers, sortChange } from './action';

import { Cities } from '../const';

import { InitialState } from '../types/initialState';

const initialState: InitialState = {
  city: Cities[0],
  offers: [],
  isDataLoaded: false,
  comments: [],
  sortType: 'Popular',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(sortChange, (state, action) => {
      state.sortType = action.payload;
    });
});
