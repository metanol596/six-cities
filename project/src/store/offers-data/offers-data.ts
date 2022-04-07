import { createSlice } from '@reduxjs/toolkit';

import { CITIES, NameSpace } from '../../const';

import { State } from '../../types/state';

type OffersData = {
  city: string;
}

const initialState: OffersData = {
  city: CITIES[0],
};

export const offersData = createSlice({
  name: NameSpace.offersData,
  initialState,
  reducers: {
    cityChange: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {cityChange} = offersData.actions;

const selectOffersDataState = (state: State) => state[NameSpace.offersData];

export const selectCity = (state: State) => selectOffersDataState(state).city;
