import { createSlice } from '@reduxjs/toolkit';

import { CITIES, NameSpace } from '../../const';

import { Offer } from '../../types/offer';
import { State } from '../../types/state';

type OffersData = {
  city: string;
  offers: Offer[];
  isDataLoaded: boolean;
}

const initialState: OffersData = {
  city: CITIES[0],
  offers: [],
  isDataLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.offersData,
  initialState,
  reducers: {
    cityChange: (state, action) => {
      state.city = action.payload;
    },
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const {cityChange, loadOffers} = offersData.actions;

const selectOffersDataState = (state: State) => state[NameSpace.offersData];

export const selectCity = (state: State) => selectOffersDataState(state).city;
export const selectOffers = (state: State) => selectOffersDataState(state).offers;
export const selectOffersStatus = (state: State) => selectOffersDataState(state).isDataLoaded;
