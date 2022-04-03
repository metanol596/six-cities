import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { APIRoute, CITIES, FetchStatus, NameSpace } from '../../const';

import { Offer } from '../../types/offer';
import { State } from '../../types/state';

import { handleError } from '../../services/handle-error';

import { api } from '../../store/index';

type OffersData = {
  city: string;
  offers: Offer[];
  offersFetchStatus: FetchStatus;
}

const initialState: OffersData = {
  city: CITIES[0],
  offers: [],
  offersFetchStatus: FetchStatus.Idle,
};

export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const offersData = createSlice({
  name: NameSpace.offersData,
  initialState,
  reducers: {
    cityChange: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersFetchStatus = FetchStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offersFetchStatus = FetchStatus.Failed;
      });
  },
});

export const {cityChange} = offersData.actions;

const selectOffersDataState = (state: State) => state[NameSpace.offersData];

export const selectCity = (state: State) => selectOffersDataState(state).city;
export const selectOffers = (state: State) => selectOffersDataState(state).offers;
export const selectOffersFetchStatus = (state: State) => selectOffersDataState(state).offersFetchStatus;
