import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../index';

//import { fetchOffersAction } from '../api-actions';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, NameSpace, SortList } from '../../const';

import { Offer } from '../../types/offer';

type OffersProcess = {
  offers: Offer[];
  offersFetchStatus: FetchStatus;

  sortType: string;
  favoritesOffers: Offer[];
  isFavoritesOffersLoaded: boolean;
  //isDataLoaded: boolean;
  offer: Offer | null;
  nearbyOffers: Offer[];
}

const initialState: OffersProcess = {
  offers: [],
  offersFetchStatus: FetchStatus.Idle,

  sortType: SortList.POPULAR,
  favoritesOffers: [],
  isFavoritesOffersLoaded: false,
  //isDataLoaded: false,
  offer: null,
  nearbyOffers: [],
};

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      //store.dispatch(loadOffers(data));
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

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
    //loadOffers: (state, action) => {
    //  state.offers = action.payload;
    //  state.isDataLoaded = true;
    //},
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
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersFetchStatus = FetchStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersFetchStatus = FetchStatus.Failed;
      });
  },
});

export const {
  sortChange,
  loadOffer,
  loadNearbyOffers,
  loadFavoritesOffers,
  //loadOffers,
  updateFavorites,
} = offersProcess.actions;
