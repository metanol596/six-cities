import { createReducer } from '@reduxjs/toolkit';

import {Offer} from '../types/offer';

import { AuthorizationStatus, CITIES, FetchStatus, SortList } from '../const';

import { cityChange, sortChange, requireAuthorization } from './action';
import { fetchOffersAction, logoutAction, loginAction } from './api-actions';

type InitialState = {
  city: string;

  offers: Offer[];
  offersStatus: FetchStatus;
  offersError: boolean;

  comments: Comment[];
  sortType: string;

  authorizationStatus: AuthorizationStatus;
  logoutStatus: FetchStatus;
  loginStatus: FetchStatus;
};

const initialState: InitialState = {
  city: CITIES[0],

  offers: [],
  offersStatus: FetchStatus.Idle,
  offersError: false,

  comments: [],
  sortType: SortList.POPULAR,

  authorizationStatus: AuthorizationStatus.Unknown,
  logoutStatus: FetchStatus.Idle,
  loginStatus: FetchStatus.Idle,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.offersStatus = FetchStatus.Pending;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offersStatus = FetchStatus.Success;
      state.offers = action.payload;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersStatus = FetchStatus.Failed;
      state.offersError = true;
    })
    .addCase(sortChange, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loginAction.pending, (state) => {
      state.loginStatus = FetchStatus.Pending;
    })
    .addCase(loginAction.fulfilled, (state) => {
      state.loginStatus = FetchStatus.Success;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(loginAction.rejected, (state) => {
      state.logoutStatus = FetchStatus.Failed;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.pending, (state) => {
      state.logoutStatus = FetchStatus.Pending;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.logoutStatus = FetchStatus.Success;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.pending, (state) => {
      state.logoutStatus = FetchStatus.Failed;
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
});
