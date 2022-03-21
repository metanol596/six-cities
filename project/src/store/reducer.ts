import { createReducer } from '@reduxjs/toolkit';

import { cityChange, loadOffers, sortChange, requireAuthorization } from './action';

import { AuthorizationStatus, Cities } from '../const';

import { InitialState } from '../types/initial-state';

const initialState: InitialState = {
  city: Cities[0],
  offers: [],
  isDataLoaded: false,
  comments: [],
  sortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Auth,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
