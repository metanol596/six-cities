import { createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';

import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';
import { State } from '../../types/state';

type OfferData = {
  offer: Offer | null;
  nearbyOffers: Offer[] | undefined;
  comments: Comment[] | undefined;
  offerFetchStatus: FetchStatus;
  nearbyOffersFetchStatus: FetchStatus;
  commentsFetchStatus: FetchStatus;
  commentFetchStatus: FetchStatus;
};

const initialState: OfferData = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  offerFetchStatus: FetchStatus.Idle,
  nearbyOffersFetchStatus: FetchStatus.Idle,
  commentsFetchStatus: FetchStatus.Idle,
  commentFetchStatus: FetchStatus.Idle,
};

export const offerData = createSlice({
  name: NameSpace.offerData,
  initialState,
  reducers: {
    loadOffer: (state, action) => {
      state.offer = action.payload;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {loadOffer, loadNearbyOffers, loadComments} = offerData.actions;

const selectOfferDataState = (state: State) => state[NameSpace.offerData];

export const selectoffer = (state: State) => selectOfferDataState(state).offer;
export const selectNearbyOffers = (state: State) => selectOfferDataState(state).nearbyOffers;
export const selectComments = (state: State) => selectOfferDataState(state).comments;
