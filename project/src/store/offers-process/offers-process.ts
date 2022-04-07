import { createSlice } from '@reduxjs/toolkit';

//import { updateOffersData } from '../../utils';

import { NameSpace, SortList } from '../../const';

import { State } from '../../types/state';
import { Offer } from '../../types/offer';

type OffersProcess = {
  sortType: string;
  favoritesOffers: Offer[];
  isFavoritesOffersLoaded: boolean;
  offers: Offer[];
  isDataLoaded: boolean;
  offer: Offer | null;
  nearbyOffers: Offer[];
}

const initialState: OffersProcess = {
  sortType: SortList.POPULAR,
  favoritesOffers: [],
  isFavoritesOffersLoaded: false,
  offers: [],
  isDataLoaded: false,
  offer: null,
  nearbyOffers: [],
};

export const offersProcess = createSlice({
  name: NameSpace.offersProcess,
  initialState,
  reducers: {
    sortChange: (state, action) => {
      state.sortType = action.payload;
    },
    loadFavoritesOffers: (state, action) => {
      state.favoritesOffers = action.payload;
      state.isFavoritesOffersLoaded = true;
    },
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadOffer: (state, action) => {
      state.offer = action.payload;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    updateFavorites: (state, action) => {
      const offerIndex = state.offers.findIndex(({id}) => id === action.payload.id);
      const nearbyOfferIndex = state.nearbyOffers.findIndex(({id}) => id === action.payload.id);

      state.offers[offerIndex] = action.payload;
      state.offer = action.payload;
      state.nearbyOffers[nearbyOfferIndex] = action.payload;
      state.favoritesOffers = state.favoritesOffers.filter(({id}) => id !== action.payload.id);
    },
  },
});

export const {
  sortChange,
  loadOffer,
  loadNearbyOffers,
  loadFavoritesOffers,
  loadOffers,
  updateFavorites,
} = offersProcess.actions;

const selectOffersProcessState = (state: State) => state[NameSpace.offersProcess];

export const selectSortType = (state: State) => selectOffersProcessState(state).sortType;
export const selectFavoritesOffers = (state: State) => selectOffersProcessState(state).favoritesOffers;
export const selectFavoritesOffersStatus = (state: State) => selectOffersProcessState(state).isFavoritesOffersLoaded;
export const selectOffers = (state: State) => selectOffersProcessState(state).offers;
export const selectOffersStatus = (state: State) => selectOffersProcessState(state).isDataLoaded;
export const selectOffer = (state: State) => selectOffersProcessState(state).offer;
export const selectNearbyOffers = (state: State) => selectOffersProcessState(state).nearbyOffers;
