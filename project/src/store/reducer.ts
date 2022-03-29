import { createReducer } from '@reduxjs/toolkit';

import { Offer } from '../types/offer';
import { Comment } from '../types/comment';

import { AuthorizationStatus, CITIES, SortList } from '../const';

import {
  cityChange,
  sortChange,
  loadOffers,
  loadOffer,
  requireAuthorization,
  login,
  loadNearbyOffers,
  loadComments
} from './action';

type InitialState = {
  city: string;

  offers: Offer[];
  nearbyOffers: Offer[];
  comments: Comment[];
  offer: Offer | null;
  isDataLoaded: boolean;

  sortType: string;

  authorizationStatus: AuthorizationStatus;
  user: Record<string, never>;
}

const initialState: InitialState = {
  city: CITIES[0],

  offers: [],
  nearbyOffers: [],
  comments: [],
  offer: null,
  isDataLoaded: false,

  sortType: SortList.POPULAR,

  authorizationStatus: AuthorizationStatus.Unknown,
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
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
