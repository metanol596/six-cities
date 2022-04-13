import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { redirectToRoute } from '../action';

import { APIRoute, AppRoute, FetchStatus, NameSpace } from '../../const';

import { Offer } from '../../types/offer';
import { AppDispatch, State } from '../../types/state';

type OffersProcess = {
  offers: Offer[];
  offersFetchStatus: FetchStatus;

  offerFetchStatus: FetchStatus;
  nearbyOffersFetchStatus: FetchStatus;

  favoritesOffers: Offer[];
  isFavoritesOffersLoaded: boolean;
  offer: Offer | null;
  nearbyOffers: Offer[];
}

const initialState: OffersProcess = {
  offers: [],
  offersFetchStatus: FetchStatus.Idle,

  offerFetchStatus: FetchStatus.Idle,
  nearbyOffersFetchStatus: FetchStatus.Idle,

  favoritesOffers: [],
  isFavoritesOffersLoaded: false,
  offer: null,
  nearbyOffers: [],
};

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch: never, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch (error) {
      handleError(error);
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw error;
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (id: number, { dispatch, extra: api }) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
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
    loadFavoritesOffers: (state, action) => {
      state.favoritesOffers = action.payload;
      state.isFavoritesOffersLoaded = true;
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
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offerFetchStatus = FetchStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerFetchStatus = FetchStatus.Failed;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.nearbyOffersFetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffersFetchStatus = FetchStatus.Success;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffersFetchStatus = FetchStatus.Failed;
      });
  },
});

export const {
  loadFavoritesOffers,
  updateFavorites,
} = offersProcess.actions;
