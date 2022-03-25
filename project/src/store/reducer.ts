import { createReducer } from '@reduxjs/toolkit';

import {Offer} from '../types/offer';

import { AuthorizationStatus, CITIES, FetchStatus, SortList } from '../const';

import { cityChange, sortChange, loadOffers, requireAuthorization, login } from './action';

type InitialState = {
  city: string;

  offers: Offer[];
  isDataLoaded: boolean;

  comments: Comment[];
  sortType: string;

  authorizationStatus: AuthorizationStatus;
  loginStatus: FetchStatus;
  logoutStatus: FetchStatus;
  user: Record<string, never>;
};

const initialState: InitialState = {
  city: CITIES[0],

  offers: [],
  isDataLoaded: false,

  comments: [],
  sortType: SortList.POPULAR,

  authorizationStatus: AuthorizationStatus.Unknown,
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
  user: {},
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
    })
    .addCase(login, (state, action) => {
      state.user = action.payload;
    });
});
